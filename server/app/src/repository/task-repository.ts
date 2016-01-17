import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import {TaskDTO} from "../dto/task-dto";

declare var app: AppService;

export class TaskRepository {

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

                    if (update.length) {
                        this.updateMany(update);
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

    private createMany(dtos:TaskDTO[]): Promise<string[]> {

        return this.getEntity().bulkCreate(dtos);

    };

    private updateMany(dtos: TaskDTO[]): Promise<void> {

        let entity: Model<string, any> = this.getEntity();

        return new Promise<void>(function(resolve: Function): void {

            var dtosConsumable = dtos.concat();

            var consume: Function = function(): void {

                if (dtosConsumable.length) {

                    var dto: TaskDTO = dtosConsumable.shift();

                    entity.update(
                        dto,
                        {
                            where: {
                                id: dto.id
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
            };
            consume();
        });
    }

    private getEntity(): Model<string, any> {
        return app.getEntity('Task');
    }
}