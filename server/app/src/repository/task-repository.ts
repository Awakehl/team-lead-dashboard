/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>

import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-convertor-service";
import {TaskDTO} from "../dto/task-dto";

declare var app: AppService;

export class TaskRepository {

    public updateOrInsertTasks(tasks:TaskDTO[]):Promise {

        return new Promise((resolve) => {

            let keys: String[] = [];
            let task:TaskDTO;
            for (task of tasks) {
                keys.push(task.key);
            }

            app.getEntity('Task').findAll({where: {key: {$in: keys}}}).then(
                (dbTasks: Model<string, any>): void => {

                    let existing: any = {};

                    for (let dbTask of dbTasks) {
                        task = EntityConverterService.toTaskDTO(dbTask);
                        existing[task.key] = task;
                    }

                    let update:TaskDTO[] = [];
                    let insert:TaskDTO[] = [];

                    for (task of tasks) {
                        if (existing.hasOwnProperty(task.key) && task != existing[task.key]) {
                            update.push(task);
                        } else if(!existing.hasOwnProperty(task.key)) {
                            insert.push(task);
                        }
                    }

                    if (update.length) {
                        this.updateMany(update);
                    }
                    if (insert.length) {
                        this.createMany(insert);
                    }
                    resolve();
                }
            );


            /*app.getEntity('UserTask').findAll().then(
                (tasks: Model<string, any>): void => {

                    let res: UserTaskDTO[] = [];

                    for (let task of tasks) {
                        res.push(
                            EntityConverterService.toUserTaskDTO(task)
                        )
                    }

                    resolve(res);
                }
            );*/
        });
    }

    /**
     * @param {TaskDTO[]} dtos
     * @return {Promise<Array<Instance>>}
     */
    private createMany(dtos:TaskDTO[]): Promise {

        return app.getEntity('Task').bulkCreate(dtos);

    };

    /**
     * @param {TaskDTO[]} dtos
     * @return {Promise}
     */
    private updateMany(dtos) {

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