var ImportTasksService = (function () {
    function ImportTasksService(jiraTaskService, taskService, userService, userTaskService) {
        this.jiraTaskService = jiraTaskService;
        this.taskService = taskService;
        this.userService = userService;
        this.userTaskService = userTaskService;
    }
    ImportTasksService.prototype.import = function (filter) {
        var _this = this;
        return this.userService.getAll()
            .then(function (users) {
            return _this.jiraTaskService.getTasks(users, filter);
        })
            .then(function (tasks) {
            return _this.taskService.importTasks(tasks);
        })
            .then(function (tasks) {
            return _this.userService.importUsersFromTasks(tasks);
        })
            .then(function (tasks) {
            return _this.userTaskService.update(tasks);
        });
    };
    return ImportTasksService;
})();
exports.ImportTasksService = ImportTasksService;
//# sourceMappingURL=import-tasks-service.js.map