/// <reference path="./../../../typings/moment/moment.d.ts" />
var moment = require('moment');
var task_report_dto_1 = require("../dto/task-report-dto");
var Promise = require('bluebird');
var TaskReportService = (function () {
    function TaskReportService(taskService, userTaskService, userService, userCalendarService) {
        this.taskService = taskService;
        this.userTaskService = userTaskService;
        this.userService = userService;
        this.userCalendarService = userCalendarService;
    }
    TaskReportService.prototype.getReport = function (filter) {
        var _this = this;
        return new Promise(function (resolve) {
            var from = moment().subtract(1, 'week');
            var promise = filter.epics || filter.users ? _this.taskService.getByFilter(filter) : _this.taskService.getByDate(from);
            promise.then(function (taskResults) {
                var userTaskSummaryResults = null;
                var userTaskSummary;
                var userResults = null;
                var unassignedTaskResults = null;
                var userIds = [];
                var resolveWhenFinished = function () {
                    if (userTaskSummaryResults && userResults && unassignedTaskResults) {
                        resolve(new task_report_dto_1.TaskReportDTO(taskResults, userTaskSummaryResults, userResults, unassignedTaskResults));
                    }
                };
                _this.userTaskService.getStatsByTasks(taskResults).then(function (userTasksSummary) {
                    userTaskSummaryResults = userTasksSummary;
                    for (var _i = 0; _i < userTasksSummary.length; _i++) {
                        userTaskSummary = userTasksSummary[_i];
                        userIds.push(userTaskSummary.userId);
                    }
                    _this.userService.getByIds(userIds)
                        .then(function (users) {
                        userResults = users;
                        resolveWhenFinished();
                    });
                });
                if (filter.epics) {
                    _this.taskService.getUnassignedTasks(filter.epics).then(function (tasks) {
                        unassignedTaskResults = tasks;
                        resolveWhenFinished();
                    });
                }
                else {
                    unassignedTaskResults = [];
                    resolveWhenFinished();
                }
            });
        });
    };
    return TaskReportService;
})();
exports.TaskReportService = TaskReportService;
//# sourceMappingURL=task-report-service.js.map