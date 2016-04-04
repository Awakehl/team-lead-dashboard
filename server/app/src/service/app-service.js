/// <reference path="../../../typings/sequelize/sequelize.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>
var AppService = (function () {
    function AppService() {
        this._ = require('lodash');
    }
    AppService.prototype.getEntity = function (entity) {
        return tl.Di.Container.getEntity(entity);
    };
    AppService.prototype.getConf = function (name) {
        return tl.Conf[this._.capitalize(name)];
    };
    ;
    AppService.prototype.getService = function (name) {
        return tl.Di.Container.getService(name);
    };
    ;
    AppService.prototype.getJiraTasksService = function () {
        return tl.Di.Container.getService('JiraTasksService');
    };
    ;
    AppService.prototype.getImportTasksService = function () {
        return tl.Di.Container.getService('ImportTasksService');
    };
    AppService.prototype.getEntityConverterService = function () {
        return tl.Di.Container.getService('EntityConverterService');
    };
    AppService.prototype.getJiraTaskRepository = function () {
        return tl.Di.Container.getRepository('JiraTaskRepository');
    };
    ;
    AppService.prototype.getTaskRepository = function () {
        return tl.Di.Container.getRepository('TaskRepository');
    };
    ;
    AppService.prototype.getUserRepository = function () {
        return tl.Di.Container.getRepository('UserRepository');
    };
    ;
    AppService.prototype.getUserService = function () {
        return tl.Di.Container.getService('UserService');
    };
    ;
    AppService.prototype.getTaskService = function () {
        return tl.Di.Container.getService('TaskService');
    };
    ;
    AppService.prototype.getUserTaskRepository = function () {
        return tl.Di.Container.getRepository('UserTaskRepository');
    };
    ;
    AppService.prototype.getUserTaskService = function () {
        return tl.Di.Container.getService('UserTaskService');
    };
    ;
    AppService.prototype.getFramework = function () {
        return tl.Di.Container.getFramework();
    };
    AppService.prototype.getTaskReportService = function () {
        return tl.Di.Container.getService('TaskReportService');
    };
    AppService.prototype.getUserCalendarRepository = function () {
        return tl.Di.Container.getRepository('UserCalendarRepository');
    };
    AppService.prototype.getUserCalendarService = function () {
        return tl.Di.Container.getService('UserCalendarService');
    };
    AppService.prototype.getInitUserCalendarService = function () {
        return tl.Di.Container.getService('InitUserCalendarService');
    };
    AppService.prototype.getMomentConvertorService = function () {
        return tl.Di.Container.getService('MomentConvertorService');
    };
    return AppService;
})();
exports.AppService = AppService;
