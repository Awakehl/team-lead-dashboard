var ImportTasksService = (function () {
    function ImportTasksService() {
    }
    ImportTasksService.prototype.import = function () {
        return app.getJiraTasksService().getTasks();
    };
    return ImportTasksService;
})();
exports.ImportTasksService = ImportTasksService;
