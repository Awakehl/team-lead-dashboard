function TasksService () {

    /**
     *
     * @param {TaskDTO[]} tasksDTOs
     */
    this.updateTasks = function(tasksDTOs) {

        var keys = [];

        tasksDTOs.forEach(

            /**
             * @param {TaskDTO} taskDTO
             */
            function(taskDTO) {
                keys.push(taskDTO.key)
            }
        );

        var model = app.getEntity('Task');

        model.findAll(
            {
                where: {
                    key: {
                        $in: keys
                    }
                }
            }
        ).then(
            /**
             * @param {Model[]} results
             */
            function(results) {


            }
        )

    }

}

module.exports = TasksService;