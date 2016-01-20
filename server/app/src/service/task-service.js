var TaskService = (function () {
    function TaskService(repository) {
        this.self = this;
        this.self.r = repository;
    }
    TaskService.prototype.importTasks = function (tasks) {
        return this.self.r.updateOrInsertTasks(tasks);
    };
    return TaskService;
})();
exports.TaskService = TaskService;
