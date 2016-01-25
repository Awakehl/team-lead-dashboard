var TaskReportDTO = (function () {
    function TaskReportDTO(tasks, userTasks, users, unassignedTasks) {
        this.tasks = tasks;
        this.userTasks = userTasks;
        this.users = users;
        this.unassignedTasks = unassignedTasks;
    }
    return TaskReportDTO;
})();
exports.TaskReportDTO = TaskReportDTO;
