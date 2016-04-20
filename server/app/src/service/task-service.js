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
    TaskService.prototype.getUnassignedTasks = function (epics) {
        return this.repository.getUnassignedTasks(epics);
    };
    TaskService.prototype.getByDate = function (from) {
        return this.repository.getByDate(from);
    };
    TaskService.prototype.getByFilter = function (filter) {
        return this.repository.getByFilter(filter);
    };
    return TaskService;
})();
exports.TaskService = TaskService;
