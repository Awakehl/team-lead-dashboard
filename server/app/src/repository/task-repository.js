var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require('bluebird');
var abstract_repository_1 = require("./abstract-repository");
var TaskRepository = (function (_super) {
    __extends(TaskRepository, _super);
    function TaskRepository() {
        _super.apply(this, arguments);
    }
    TaskRepository.prototype.updateOrInsertTasks = function (tasks) {
        var _this = this;
        return new Promise(function (resolve) {
            var ids = [];
            var task;
            for (var _i = 0; _i < tasks.length; _i++) {
                task = tasks[_i];
                ids.push(task.id);
            }
            _this.getEntity().findAll({ where: { id: { $in: ids } } }).then(function (dbTasks) {
                var existing = {};
                for (var _i = 0; _i < dbTasks.length; _i++) {
                    var dbTask = dbTasks[_i];
                    task = app.getEntityConverterService().toTaskDTO(dbTask);
                    existing[task.id] = task;
                }
                var update = [];
                var insert = [];
                for (var _a = 0; _a < tasks.length; _a++) {
                    task = tasks[_a];
                    if (existing.hasOwnProperty(task.id)
                        && !app.getEntityConverterService().isEquals(task, existing[task.id])) {
                        update.push(task);
                    }
                    else if (!existing.hasOwnProperty(task.id)) {
                        insert.push(task);
                    }
                }
                _this.createMany(insert).then(function () {
                    _this.updateMany(update).then(function () {
                        resolve(tasks);
                    });
                });
            });
        });
    };
    TaskRepository.prototype.getByIds = function (ids) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getEntity().findAll({ where: { id: { $in: ids } } }).then(function (dbTasks) {
                var result = [];
                for (var _i = 0; _i < dbTasks.length; _i++) {
                    var dbTask = dbTasks[_i];
                    result.push(app.getEntityConverterService().toTaskDTO(dbTask));
                }
                resolve(result);
            });
        });
    };
    TaskRepository.prototype.getEntity = function () {
        return app.getEntity('Task');
    };
    return TaskRepository;
})(abstract_repository_1.AbstractRepository);
exports.TaskRepository = TaskRepository;
