/// <reference path="./../../../typings/moment/moment.d.ts" />
/// <reference path="./../../../typings/bluebird/bluebird.d.ts" />
var Promise = require('bluebird');
var UserCalendarService = (function () {
    function UserCalendarService(repository) {
        this.repository = repository;
    }
    UserCalendarService.prototype.getGroupedByUserIdsAndDates = function (userIds, dates) {
        var _this = this;
        return new Promise(function (resolve) {
            var strUserId;
            var userCalendar;
            var result = {};
            _this.repository.getByUserIdsAndDates(userIds, dates).then(function (userCalendars) {
                for (var _i = 0; _i < userCalendars.length; _i++) {
                    userCalendar = userCalendars[_i];
                    strUserId = userCalendar.userId.toString();
                    if (!result.hasOwnProperty(strUserId)) {
                        result[strUserId] = {};
                    }
                    if (!result[strUserId].hasOwnProperty(userCalendar.date)) {
                        result[strUserId][userCalendar.date] = [];
                    }
                    result[strUserId][userCalendar.date].push(userCalendar);
                }
                resolve(result);
            });
        });
    };
    UserCalendarService.prototype.initUserCalendar = function (userId) {
        return this.repository.initUserCalendar(userId);
    };
    return UserCalendarService;
})();
exports.UserCalendarService = UserCalendarService;
