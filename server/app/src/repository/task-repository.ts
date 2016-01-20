import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import {TaskDTO} from "../dto/task-dto";
import Promise = require('bluebird');
import {AbstractRepository} from "./abstract-repository";

declare var app: AppService;

export class TaskRepository extends AbstractRepository {

    public updateOrInsertTasks(tasks:TaskDTO[]):Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve) => {

            let ids: number[] = [];
            let task:TaskDTO;
            for (task of tasks) {
                ids.push(task.id);
            }

            this.getEntity().findAll({where: {id: {$in: ids}}}).then(
                (dbTasks: string[]): void => {

                    let existing: any = {};

                    for (let dbTask of dbTasks) {
                        task = app.getEntityConverterService().toTaskDTO(dbTask);
                        existing[task.id] = task;
                    }

                    let update:TaskDTO[] = [];
                    let insert:TaskDTO[] = [];

                    for (task of tasks) {
                        if (
                            existing.hasOwnProperty(task.id)
                            && !app.getEntityConverterService().isEquals(task, existing[task.id]))
                        {
                            update.push(task);
                        } else if(!existing.hasOwnProperty(task.id)) {
                            insert.push(task);
                        }
                    }

                    this.createMany(insert).then((): void => {
                        this.updateMany(update).then((): void => {
                            resolve(tasks);
                        })
                    });
                }
            );
        });
    }

    protected getEntity(): Model<string, any> {
        return app.getEntity('Task');
    }
}