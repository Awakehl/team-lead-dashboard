function ImportTasksService() {

    this.import = function() {

        /**
         * @param {Event} event
         */
        var handleTasksLoaded = function(event) {

            app.getTasksService().updateTasks(event.data);

        };

        /**
         * @param {Event} event
         */
        var handleTasksUpdated = function(event) {

        };

        /**
         * @param {Event} event
         */
        var handleTasksUsersTasksUpdated = function(event) {

        };


        var dispatcher = app.getUpdateTasksDispatcherService();

        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_TASKS_LOADED, handleTasksLoaded);

        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_TASKS_UPDATED, handleTasksUpdated);

        dispatcher.eventDispatcher.addListener(dispatcher.EVENT_USER_TASKS_UPDATED, handleTasksUsersTasksUpdated);



        app.getJiraTasksService().getTasks();

        //JiratasksService.getTasks
        //UpdateTasjksService.updateTasks
        //UpdateTasjksService.updateUserTasks


    }
}

module.exports = ImportTasksService;