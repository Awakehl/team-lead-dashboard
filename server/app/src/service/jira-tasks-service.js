var JiraTasksService = (function () {
    function JiraTasksService() {
    }
    JiraTasksService.prototype.getTasks = function () {
        return app.getJiraTaskRepository().getTasks();
    };
    return JiraTasksService;
})();
exports.JiraTasksService = JiraTasksService;
