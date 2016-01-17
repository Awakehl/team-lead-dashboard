var TaskDTO = (function () {
    function TaskDTO(id, key, assignee, estimation, summary, status) {
        this.id = id;
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
    }
    return TaskDTO;
})();
exports.TaskDTO = TaskDTO;
