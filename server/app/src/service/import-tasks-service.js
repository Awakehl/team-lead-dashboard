var ImportTasksService = (function () {
    function ImportTasksService(jiraTaskService, taskService, userService) {
        this.jiraTaskService = jiraTaskService;
        this.taskService = taskService;
        this.userService = userService;
    }
    ImportTasksService.prototype.import = function () {
        var _this = this;
        this.jiraTaskService
            .getTasks()
            .then(function (tasks) {
            return _this.taskService.importTasks(tasks);
        })
            .then(function (tasks) {
            return _this.userService.importUsersFromTasks(tasks);
        });
    };
    return ImportTasksService;
})();
exports.ImportTasksService = ImportTasksService;
