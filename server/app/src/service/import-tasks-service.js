var ImportTasksService = (function () {
    function ImportTasksService() {
    }
    ImportTasksService.prototype.import = function () {
        app.getJiraTasksService().getTasks().then(function (tasks) {
            console.log(tasks);
            app.getTaskService().importTasks(tasks).then(function () {
                console.log('imported');
            });
        });
    };
    return ImportTasksService;
})();
exports.ImportTasksService = ImportTasksService;
