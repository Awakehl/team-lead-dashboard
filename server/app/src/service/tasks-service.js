function TasksService () {

    var Promise = require('promise');

    /**
     * @param {TaskDTO} tasksDTOs
     * @return {Promise}
     */
    this.updateTasks = function(tasksDTOs) {

        return new Promise(function(resolve) {

            var keys = [];
            var tasksByKeys = {};

            tasksDTOs.forEach(

                /**
                 * @param {TaskDTO} taskDTO
                 */
                function(taskDTO) {
                    keys.push(taskDTO.key)
                    tasksByKeys[taskDTO.key] = taskDTO;
                }
            );

            app.getTaskRepository()
                .findByKeys(keys)
                .then(

                    /**
                     * @param {TaskDTO} dbTasks
                     */
                    function(dbTasks) {

                        var insert = [];
                        var update = [];

                        dbTasks.forEach(

                            /**
                             * @param {TaskDTO} task
                             */
                            function(task) {
                                if (keys.indexOf(task.key) === -1) {
                                    insert.push(tasksByKeys[task.key]);
                                } else if(tasksByKeys[task.key] != task) {
                                    update.push(tasksByKeys[task.key]);
                                }
                            }
                        );

                        app.getTaskRepository()
                            .createMany(insert)
                            .then(function() {
                                app.getTaskRepository()
                                    .updateMany(update)
                                    .then(function() {
                                        resolve([]);
                                    });
                            });
                    }
                );
        })
    }

}

module.exports = TasksService;