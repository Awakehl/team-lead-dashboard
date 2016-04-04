/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var user_task_dto_1 = require("../dto/user-task-dto");
var Promise = require('bluebird');
var moment = require('moment');
var abstract_repository_1 = require("./abstract-repository");
var UserTaskRepository = (function (_super) {
    __extends(UserTaskRepository, _super);
    function UserTaskRepository() {
        _super.apply(this, arguments);
    }
    UserTaskRepository.prototype.update = function (tasks) {
        var _this = this;
        return new Promise(function (resolve) {
            var task;
            var taskIds = [];
            var assignees = [];
            var usersByName = {};
            var user;
            for (var _i = 0; _i < tasks.length; _i++) {
                var task_1 = tasks[_i];
                taskIds.push(task_1.id);
                assignees.push(task_1.assignee);
            }
            app.getEntity('User').findAll({ where: { name: { $in: assignees } } }).then(function (dbUsers) {
                for (var _i = 0; _i < dbUsers.length; _i++) {
                    var dbUser = dbUsers[_i];
                    user = app.getEntityConverterService().toUserDTO(dbUser);
                    usersByName[user.name] = user;
                }
                _this.getEntity().findAll({ where: { task_id: { $in: taskIds } } }).then(function (dbUserTasks) {
                    var existing = {};
                    var userTask;
                    for (var _i = 0; _i < dbUserTasks.length; _i++) {
                        var dbUserTask = dbUserTasks[_i];
                        userTask = app.getEntityConverterService().toUserTaskDTO(dbUserTask);
                        existing[userTask.taskId] = userTask;
                    }
                    var update = [];
                    var insert = [];
                    var startTime;
                    var endTime;
                    var now = moment().format('YYYY-MM-DD HH:mm:ss');
                    console.log(now);
                    for (var _a = 0; _a < tasks.length; _a++) {
                        task = tasks[_a];
                        userTask = existing.hasOwnProperty(task.id) ? existing[task.id] : null;
                        user = usersByName[task.assignee];
                        startTime = userTask ? null : now;
                        endTime = task.inProgress() ? null : now;
                        var log = '[' + now + '][' + task.key + ']';
                        if (userTask) {
                            if (task.inProgress()) {
                                if (endTime) {
                                    // finished task which is in progress
                                    userTask.endTime = endTime;
                                    update.push(app.getEntityConverterService().toUserTaskDbObject(userTask));
                                    console.log(log + '\tfinished');
                                }
                                else if (!user || user.id != userTask.userId) {
                                    // assignee changed on task inprogress
                                    // close on current user
                                    userTask.endTime = now;
                                    update.push(app.getEntityConverterService().toUserTaskDbObject(userTask));
                                    console.log(log + '\tclosed reassigned task');
                                    // open on new user
                                    if (user) {
                                        insert.push(app.getEntityConverterService().toUserTaskDbObject(new user_task_dto_1.UserTaskDTO(null, userTask.taskId, user.id, now, null)));
                                        console.log(log + '\t new task on ' + user.name);
                                    }
                                }
                                else {
                                }
                            }
                            else {
                            }
                        }
                        else if (user) {
                            if (endTime) {
                                //console.log(log + '\tassigned but finished - ignoring');
                                insert.push(app.getEntityConverterService().toUserTaskDbObject(new user_task_dto_1.UserTaskDTO(null, task.id, user.id, now, now)));
                                console.log(log + '\tnew finished task on ' + user.name);
                            }
                            else {
                                // new assigned task (not finished yet)
                                insert.push(app.getEntityConverterService().toUserTaskDbObject(new user_task_dto_1.UserTaskDTO(null, task.id, user.id, now, null)));
                                console.log(log + '\tnew task on ' + user.name);
                            }
                        }
                        else {
                        }
                    }
                    _this.createMany(insert).then(function () {
                        _this.updateMany(update).then(function () {
                            resolve(tasks);
                        });
                    });
                });
            });
        });
    };
    UserTaskRepository.prototype.getByTaskIds = function (taskIds) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getEntity().findAll({ where: { task_id: { $in: taskIds } }, order: 'id ASC' }).then(function (dbUserTasks) {
                var result = [];
                for (var _i = 0; _i < dbUserTasks.length; _i++) {
                    var dbUserTask = dbUserTasks[_i];
                    result.push(app.getEntityConverterService().toUserTaskDTO(dbUserTask));
                }
                resolve(result);
            });
        });
    };
    UserTaskRepository.prototype.getStatsByTasks = function (tasks) {
        var taskIds = [0];
        var assignee = [];
        var task;
        var uniq = {};
        for (var _i = 0; _i < tasks.length; _i++) {
            task = tasks[_i];
            taskIds.push(task.id);
            if (-1 === assignee.indexOf(task.assignee)) {
                assignee.push(task.assignee);
            }
        }
        assignee = ("'" + assignee.join("','") + "'").split(',');
        return new Promise(function (resolve) {
            var query = 'SELECT ut.task_id, ut.user_id, min(ut.start_time) AS start_time, max(ut.end_time) AS end_time, ' +
                '( ' +
                'SELECT SUM(TIMESTAMPDIFF(SECOND, GREATEST(c.start_time, ut.start_time), ' +
                'LEAST( ' +
                'c.end_time, ' +
                'COALESCE(ut.end_time, UTC_TIMESTAMP()) ' +
                ') ' +
                ')) FROM userCalendars c ' +
                'WHERE ' +
                'c.start_time < COALESCE(ut.end_time, UTC_TIMESTAMP()) ' +
                'AND c.end_time > ut.start_time ' +
                'AND c.user_id = ut.user_id ' +
                ') AS spent_time ' +
                'FROM userTasks ut ' +
                'INNER JOIN users u ON u.id = ut.user_id ' +
                'WHERE ut.task_id IN (' + taskIds.join(',') + ') ' +
                'AND u.name IN (' + assignee.join(',') + ') ' +
                'GROUP BY ut.task_id, ut.user_id';
            app.getFramework().query(query).then(function (res) {
                var dbItem;
                var item;
                var items = [];
                for (var _i = 0, _a = res[0]; _i < _a.length; _i++) {
                    dbItem = _a[_i];
                    item = app.getEntityConverterService().toUserTaskSummaryDTO(dbItem);
                    items.push(item);
                }
                resolve(items);
            });
        });
    };
    UserTaskRepository.prototype.getEntity = function () {
        return app.getEntity('UserTask');
    };
    return UserTaskRepository;
})(abstract_repository_1.AbstractRepository);
exports.UserTaskRepository = UserTaskRepository;
