'use strict'

function TaskRepository() {

    var model = app.getEntity('Task');

    /**
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

    var Promise = require('promise');

    /**
     * @return {Promise}
     */
    this.findByKeys = function (keys) {

        return new Promise(function(resolve) {

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

                    var res = [];

                    results.forEach(

                        /**
                         * @param {Model} result
                         */
                         function(result) {

                            /**
                             * @type {TaskDTO}
                             */
                            var dto = modelToDto(result);
                            res.push(dto);
                        }
                    );

                    resolve(res);

                }
            )
        });
    };

    /**
     * @param {TaskDTO[]} dtos
     * @return {Promise<Array<Instance>>}
     */
    this.createMany = function(dtos) {

        return model.bulkCreate(dtos);

    };

    /**
     * @param {TaskDTO[]} dtos
     * @return {Promise}
     */
    this.updateMany = function(dtos) {

        return new Promise(function(resolve) {

            var dtosConsumable = dtos.concat();

            var consume = function() {

                if (dtosConsumable.length) {

                    /**
                     * @type {TaskDTO}
                     */
                    var dto = dtosConsumable.shift();

                    model.update(
                        dto,
                        {
                            where: {
                                key: dto.key
                            }
                        }
                    ).then(
                        function() {
                            consume();
                        }
                    )
                } else {
                    resolve([]);
                }
            }
        });
    }
}

module.exports = TaskRepository;
