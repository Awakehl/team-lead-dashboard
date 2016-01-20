var UserTaskService = (function () {
    function UserTaskService(repository) {
        this.repository = repository;
    }
    UserTaskService.prototype.update = function (tasks) {
        return this.repository.update(tasks);
    };
    return UserTaskService;
})();
exports.UserTaskService = UserTaskService;
