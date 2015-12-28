/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>

import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-convertor-service";

declare var app: AppService;

export class UserTaskRepository {

    public getTasks():Promise<UserTaskDTO[]> {

        return new Promise<UserTaskDTO[]>((resolve) => {
            app.getEntity('UserTask').findAll().then(
                (tasks: Model<string, any>): void => {

                    let res: UserTaskDTO[] = [];

                    for (let task of tasks) {
                        res.push(
                            EntityConverterService.toUserTaskDTO(task)
                        )
                    }

                    resolve(res);
                }
            );
        });
    }

}