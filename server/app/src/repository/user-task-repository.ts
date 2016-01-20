/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../typings/moment/moment.d.ts"/>

import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import Promise = require('bluebird');
import moment = require('moment');
import {TaskDTO} from "../dto/task-dto";
import {UserDTO} from "../dto/user-dto";
import {AbstractRepository} from "./abstract-repository";

declare var app: AppService;

export class UserTaskRepository extends AbstractRepository {

    public update(tasks: TaskDTO[]):Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve) => {
            let task: TaskDTO;
            let taskIds: number[] = [];
            let assignees: string[] = [];
            let usersByName: {[id: string]: UserDTO} = {};
            let user: UserDTO;
            for (let task of tasks) {
                taskIds.push(task.id);
                assignees.push(task.assignee);
            }

            app.getEntity('User').findAll({where: {name: {$in: assignees}}}).then((dbUsers: string[]) => {

                for (let dbUser of dbUsers) {
                    user = app.getEntityConverterService().toUserDTO(dbUser);
                    usersByName[user.name] = user;
                }

                this.getEntity().findAll({where: {task_id: {$in: taskIds}, end_time: {$is: null}}}).then(
                    (dbUserTasks: string[]): void => {

                        let existing: any = {};
                        let userTask: UserTaskDTO;

                        for (let dbUserTask of dbUserTasks) {
                            userTask = app.getEntityConverterService().toUserTaskDTO(dbUserTask);
                            existing[userTask.taskId] = userTask;
                        }

                        let update:UserTaskDTO[] = [];
                        let insert:UserTaskDTO[] = [];

                        let startTime: string;
                        let endTime: string;

                        let now: string = moment().format('YYYY-MM-DD HH:mm:ss');

                        for (task of tasks) {

                            userTask = existing.hasOwnProperty(task.id) ? existing[task.id] : null;
                            user = usersByName[task.assignee];

                            startTime= userTask ? null : now;
                            endTime = task.isCompleted() || task.isPaused() ? now : null;

                            let log = '['+now+']['+task.key+']';

                            if (userTask) {
                                if (endTime) {
                                    // finished task
                                    userTask.endTime = endTime;
                                    update.push(app.getEntityConverterService().toUserTaskDbObject(userTask));
                                    console.log(log + '\tfinished');
                                } else if (!user || user.id != userTask.userId) {
                                    // assignee changed on task inprogress
                                    // close on current user
                                    userTask.endTime = now;
                                    update.push(app.getEntityConverterService().toUserTaskDbObject(userTask));
                                    console.log(log + '\tclosed reassigned task');
                                    // open on new user
                                    if (user) {
                                        insert.push(app.getEntityConverterService().toUserTaskDbObject(new UserTaskDTO(
                                            null,
                                            userTask.taskId,
                                            user.id,
                                            now,
                                            null
                                        )));
                                        console.log(log + '\t new task on ' + user.name);
                                    }
                                } else {
                                    //console.log(log + '\tno change');
                                }
                            } else if(user) {
                                if (endTime) {
                                    //console.log(log + '\tassigned but finished - ignoring');
                                } else {
                                    // new assigned task (not finished yet)
                                    insert.push(app.getEntityConverterService().toUserTaskDbObject(new UserTaskDTO(
                                        null,
                                        task.id,
                                        user.id,
                                        now,
                                        null
                                    )));
                                    console.log(log + '\tnew task on ' + user.name);
                                }
                            } else {
                                // not assigned
                                //console.log('\tnot assigned - ignoring');
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


        });
    }

    protected getEntity(): Model<string, any> {
        return app.getEntity('UserTask');
    }

}