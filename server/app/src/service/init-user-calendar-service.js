var InitUserCalendarService = (function () {
    function InitUserCalendarService(userService, userCalendarService) {
        this.userService = userService;
        this.userCalendarService = userCalendarService;
    }
    InitUserCalendarService.prototype.initUsers = function () {
        var _this = this;
        this.userService.getAll().then(function (users) {
            var user;
            for (var _i = 0; _i < users.length; _i++) {
                user = users[_i];
                _this.userCalendarService.initUserCalendar(user.id);
            }
        });
    };
    return InitUserCalendarService;
})();
exports.InitUserCalendarService = InitUserCalendarService;
//# sourceMappingURL=init-user-calendar-service.js.map