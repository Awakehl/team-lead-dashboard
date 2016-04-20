var TaskReportDTO = (function () {
    function TaskReportDTO(tasks, userTasksSummary, users, unassignedTasks) {
        this.tasks = tasks;
        this.userTasksSummary = userTasksSummary;
        this.users = users;
        this.unassignedTasks = unassignedTasks;
    }
    return TaskReportDTO;
})();
exports.TaskReportDTO = TaskReportDTO;
