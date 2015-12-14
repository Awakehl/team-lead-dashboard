function AppService() {

    var _ = require("lodash");

    this.getService = tl.Di.Container.getService;

    /**
     * @returns TasksService
     */
    this.getTasksService = function() {
        return this.getService('TasksService');
    };

    /**
     * @returns UpdateTasksDispatcherService
     */
    this.getUpdateTasksDispatcherService = function() {
        return this.getService('UpdateTasksDispatcherService');
    };

    /**
     * @returns JiraTasksService
     */
    this.getJiraTasksService = function() {
        return this.getService('JiraTasksService');
    };

    /**
     * @returns EventsService
     */
    this.getEventsService = function() {
        return this.getService('EventsService');
    };

    /**
     * @returns ImportTasksService
     */
    this.getImportTasksService = function() {
        return this.getService('ImportTasksService');
    };

    /**
     * @returns TaskRepository
     */
    this.getTaskRepository = function() {
        return this.getRepository('Task');
    };

    /**
     * @returns {TaskDTO}
     */
    this.getTaskDTO = function() {
        return tl.Di.Container.getDTO('Task');
    };

    /**
     * @returns {UserDTO}
     */
    this.getUserDTO = function() {
        return tl.Di.Container.getDTO('User');
    };

    this.getEntity = tl.Di.Container.getEntity;


   /* this.getEntities = function() {
        return tl.Di.Entities
    };*/

    this.getRepository = tl.Di.Container.getRepository;
    this.getFramework = tl.Di.Container.getFramework;

    this.getConf = function(name) {
        return tl.Conf[_.capitalize(name)]
    };

    this.share = function(name) {
        return tl.Conf[_.capitalize(name)]
    };

}


module.exports = AppService;

