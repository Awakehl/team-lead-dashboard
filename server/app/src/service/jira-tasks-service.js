var JiraTasksService = (function () {
    function JiraTasksService() {
    }
    JiraTasksService.prototype.getTasks = function (users) {
        return app.getJiraTaskRepository().getTasks(users);
    };
    return JiraTasksService;
})();
exports.JiraTasksService = JiraTasksService;
//# sourceMappingURL=jira-tasks-service.js.map