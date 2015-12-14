function ImportTasksService() {

    this.import = function() {

        /**
         * @param {Event} event
         */
        var handleTasksLoaded = function(event) {

            /**
             * @type {TaskDTO[]}
             */
            var tasks = event.data;

            app.getTasksService()
                .updateTasks(tasks)
                .then(function() {
                    //handleTasksUpdated(tasks)

                    app.getUserTasksService()
                        .updateTasks(tasks)
                });

        };

        /**
         * @type {TaskDTO[]}
         */
        var handleTasksUpdated = function(tasks) {

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