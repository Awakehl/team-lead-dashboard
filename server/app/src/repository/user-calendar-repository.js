/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require('bluebird');
var moment = require('moment');
var abstract_repository_1 = require("./abstract-repository");
var UserCalendarRepository = (function (_super) {
    __extends(UserCalendarRepository, _super);
    function UserCalendarRepository() {
        _super.apply(this, arguments);
    }
    UserCalendarRepository.prototype.getByUserIdsAndDates = function (userIds, dates) {
        return new Promise(function (resolve) {
            var userCalendar;
            var result;
            app.getEntity('UserCalendar').findAll({ where: { $and: [
                        { date: { $in: dates } },
                        { user_id: { $in: userIds } }
                    ] } }).then(function (dbUserCalendars) {
                for (var _i = 0; _i < dbUserCalendars.length; _i++) {
                    var dbUserCalendar = dbUserCalendars[_i];
                    userCalendar = app.getEntityConverterService().toUserCalendarDTO(dbUserCalendar);
                    result.push(userCalendar);
                }
                resolve(result);
            });
        });
    };
    UserCalendarRepository.prototype.initUserCalendar = function (userId) {
        return new Promise(function (resolve) {
            var now = moment().utc().format('YYYY-MM-DD HH:mm:ss');
            app.getFramework().query('SELECT IFNULL(MAX(date), 0) AS maxDate FROM userCalendars where user_id = ' + userId + ' LIMIT 1').then(function (res) {
                var startTime = res[0][0]['maxDate'];
                app.getFramework().query('INSERT INTO userCalendars(`user_id`, `date`, `start_time`, `end_time`, `createdAt`, `updatedAt`) ' +
                    'SELECT ' + userId + ', `dt`, `dt` + INTERVAL 10 HOUR, `dt` + INTERVAL 13 HOUR, "' + now + '", "' + now + '" ' +
                    'FROM refCalendar WHERE refCalendar.isholiday = 0 ' +
                    'AND refCalendar.isweekday = 1 AND refCalendar.dyw != 6 ' +
                    'AND refCalendar.dt > "' + startTime + '"').then(function () {
                    app.getFramework().query('INSERT INTO userCalendars(`user_id`, `date`, `start_time`, `end_time`, `createdAt`, `updatedAt`) ' +
                        'SELECT ' + userId + ', `dt`, `dt` + INTERVAL 14 HOUR, `dt` + INTERVAL 19 HOUR, "' + now + '", "' + now + '" ' +
                        'FROM refCalendar WHERE refCalendar.isholiday = 0 ' +
                        'AND refCalendar.isweekday = 1 AND refCalendar.dyw != 6 ' +
                        'AND refCalendar.dt > "' + startTime + '"').then(function () {
                        resolve();
                    });
                });
            });
        });
    };
    UserCalendarRepository.prototype.getEntity = function () {
        return app.getEntity('UserCalendar');
    };
    return UserCalendarRepository;
})(abstract_repository_1.AbstractRepository);
exports.UserCalendarRepository = UserCalendarRepository;
//# sourceMappingURL=user-calendar-repository.js.map