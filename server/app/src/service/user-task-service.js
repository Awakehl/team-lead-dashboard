/// <reference path="./../../../typings/moment/moment.d.ts" />
var UserTaskService = (function () {
    function UserTaskService(repository) {
        this.repository = repository;
    }
    UserTaskService.prototype.update = function (tasks) {
        return this.repository.update(tasks);
    };
    UserTaskService.prototype.getByTaskIds = function (taskIds) {
        return this.repository.getByTaskIds(taskIds);
    };
    UserTaskService.prototype.getStatsByTasks = function (tasks) {
        return this.repository.getStatsByTasks(tasks);
    };
    return UserTaskService;
})();
exports.UserTaskService = UserTaskService;
