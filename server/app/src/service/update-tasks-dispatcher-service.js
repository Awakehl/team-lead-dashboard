function UpdateTasksDispatcherService () {

    this.EVENT_TASKS_LOADED = 'event_tasks_loaded';
    this.EVENT_TASKS_UPDATED = 'event_tasks_updated';
    this.EVENT_USER_TASKS_UPDATED = 'event_user_tasks_updated';

    var events = require("event-dispatcher");

    var self = this;
    this.eventDispatcher = new events.EventDispatcher();
    this.eventDispatcher.getSupportedEvents = function () {
        return [
            self.EVENT_TASKS_LOADED,
            self.EVENT_TASKS_UPDATED,
            self.EVENT_USER_TASKS_UPDATED
        ];
    };

}

module.exports = UpdateTasksDispatcherService;