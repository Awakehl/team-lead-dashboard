/// <reference path="./../../../typings/moment/moment.d.ts" />
var moment = require('moment');
var task_report_dto_1 = require("../dto/task-report-dto");
var TaskReportService = (function () {
    function TaskReportService(taskService, userTaskService, userService) {
        this.taskService = taskService;
        this.userTaskService = userTaskService;
        this.userService = userService;
    }
    TaskReportService.prototype.getReport = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var from = moment().subtract(1, 'week');
            _this.userTaskService.getByDate(from).then(function (userTasksResults) {
                var taskIds = [];
                var userTask;
                var tasksResults = null;
                var userResults = null;
                var resolveWhenFinished = function () {
                    if (tasksResults && userResults) {
                        resolve(new task_report_dto_1.TaskReportDTO(tasksResults, userTasksResults, userResults));
                    }
                };
                for (var _i = 0; _i < userTasksResults.length; _i++) {
                    userTask = userTasksResults[_i];
                    taskIds.push(userTask.taskId);
                }
                _this.taskService.getByIds(taskIds).then(function (tasks) {
                    tasksResults = tasks;
                    resolveWhenFinished();
                });
                _this.userService.getAll().then(function (users) {
                    userResults = users;
                    resolveWhenFinished();
                });
            });
        });
    };
    return TaskReportService;
})();
exports.TaskReportService = TaskReportService;
