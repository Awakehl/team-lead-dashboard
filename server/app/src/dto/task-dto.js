var TaskDTO = (function () {
    function TaskDTO(id, key, assignee, estimation, summary, status) {
        this.id = id;
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
    }
    TaskDTO.prototype.isCompleted = function () {
        return -1 !== ['work done', 'verified', 'rc verified', 'live'].indexOf(this.status.toLowerCase());
    };
    TaskDTO.prototype.isPaused = function () {
        return -1 !== ['on hold (dev)'].indexOf(this.status.toLowerCase());
    };
    return TaskDTO;
})();
exports.TaskDTO = TaskDTO;
