var JiraTasksService = (function () {
    function JiraTasksService() {
    }
    JiraTasksService.prototype.getTasks = function (users, filter) {
        return app.getJiraTaskRepository().getTasks(users, filter);
    };
    return JiraTasksService;
})();
exports.JiraTasksService = JiraTasksService;
