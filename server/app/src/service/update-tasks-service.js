function UpdateTasksService() {


    this.update = function() {

        /** @var {UpdateTasksDispatcherService} dispatcher **/
        var dispatcher = app.getService('updateTasksDispatcherService');

        /** @var {EventsService} eventsService **/
        var eventsService = app.getService('eventsService');

        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_TASKS_LOADED, handleTasksLoaded);
        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_TASKS_UPDATED, handleTasksUpdated);
        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_USER_TASKS_UPDATED, handleUserTasksUpdated);

        var event = eventsService.createEvent({tasks:null});

        dispatcher.eventDispatcher.dispatch(dispatcher.EVENT_TASKS_LOADED, event);

    };

    /**
     * @param {Event} event
     */
    var handleTasksLoaded = function(event) {
        console.log('handleTasksLoaded got event '+event)
    };

    /**
     * @param {Event} event
     */
    var handleTasksUpdated = function(event) {
        console.log('handleTasksUpdated got event '+event)
    };

    /**
     * @param {Event} event
     */
    var handleUserTasksUpdated = function(event) {
        console.log('handleUserTasksUpdated got event '+event)
    };
}

module.exports = UpdateTasksService;