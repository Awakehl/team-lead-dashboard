var TaskDTO = (function () {
    function TaskDTO(key, assignee, estimation, summary, status) {
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
    }
    return TaskDTO;
})();
exports.TaskDTO = TaskDTO;
