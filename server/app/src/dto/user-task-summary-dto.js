var UserTaskSummaryDTO = (function () {
    function UserTaskSummaryDTO(taskId, userId, startTime, endTime, spentTime) {
        this.taskId = taskId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.spentTime = spentTime;
    }
    return UserTaskSummaryDTO;
})();
exports.UserTaskSummaryDTO = UserTaskSummaryDTO;
//# sourceMappingURL=user-task-summary-dto.js.map