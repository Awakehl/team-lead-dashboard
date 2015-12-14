function  TaskRepository() {


    /**
     *
     * @param model
     * @returns {TaskDTO}
     */
    var modelToDto = function(model) {

        var dto = new (app.getTaskDTO());
        dto.assignee = model.assignee;
        dto.key = model.key;
        dto.estimation = model.estimation;
        dto.status = model.status;
           dto.summary = model.summary;

        return dto;

    };

    this.findByKeys = function () {

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
                modelToDto()

            }
        )


    }

}

module.exports = TaskRepository;
