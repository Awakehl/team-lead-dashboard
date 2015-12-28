var AppService = (function () {
    function AppService() {
    }
    AppService.prototype.getEntity = function (entity) {
        return tl.Di.Container.getEntity;
    };
    AppService.prototype.getConf = function (name) {
        return tl.Conf[_.capitalize(name)];
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
    AppService.prototype.getJiraTaskRepository = function () {
        return tl.Di.Container.getRepository('JraTaskRepository');
    };
    ;
    AppService.prototype.getFramework = function () {
        return tl.Di.Container.getFramework();
    };
    return AppService;
})();
exports.AppService = AppService;
