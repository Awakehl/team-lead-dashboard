var UserTaskDTO = (function () {
    function UserTaskDTO(key, userId, startTime, endTime) {
        this.key = key;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    return UserTaskDTO;
})();
exports.UserTaskDTO = UserTaskDTO;
