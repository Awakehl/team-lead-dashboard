var TaskReportDTO = (function () {
    function TaskReportDTO(tasks, userTasks, users) {
        this.tasks = tasks;
        this.userTasks = userTasks;
        this.users = users;
    }
    return TaskReportDTO;
})();
exports.TaskReportDTO = TaskReportDTO;
