var UserTaskDTO = (function () {
    function UserTaskDTO(id, taskId, userId, startTime, endTime) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    return UserTaskDTO;
})();
exports.UserTaskDTO = UserTaskDTO;
