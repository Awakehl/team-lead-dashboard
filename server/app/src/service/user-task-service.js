/// <reference path="./../../../typings/moment/moment.d.ts" />
var UserTaskService = (function () {
    function UserTaskService(repository) {
        this.repository = repository;
    }
    UserTaskService.prototype.update = function (tasks) {
        return this.repository.update(tasks);
    };
    UserTaskService.prototype.getByDate = function (from) {
        return this.repository.getByDate(from);
    };
    return UserTaskService;
})();
exports.UserTaskService = UserTaskService;
