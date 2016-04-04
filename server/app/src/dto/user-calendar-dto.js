var UserCalendarDTO = (function () {
    function UserCalendarDTO(id, userId, date, startTime, endTime) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    return UserCalendarDTO;
})();
exports.UserCalendarDTO = UserCalendarDTO;
