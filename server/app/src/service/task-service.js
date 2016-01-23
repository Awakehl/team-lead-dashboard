var TaskService = (function () {
    function TaskService(repository) {
        this.repository = repository;
    }
    TaskService.prototype.importTasks = function (tasks) {
        return this.repository.updateOrInsertTasks(tasks);
    };
    TaskService.prototype.getByIds = function (ids) {
        if (ids === void 0) { ids = []; }
        return this.repository.getByIds(ids);
    };
    return TaskService;
})();
exports.TaskService = TaskService;
