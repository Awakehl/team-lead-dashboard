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
import Moment = moment.Moment;
import {UserTaskSummaryDTO} from "../dto/user-task-summary-dto";

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

                this.getEntity().findAll({where: {task_id: {$in: taskIds}}}).then(
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
console.log(now);
                        for (task of tasks) {

                            userTask = existing.hasOwnProperty(task.id) ? existing[task.id] : null;
                            user = usersByName[task.assignee];

                            startTime= userTask ? null : now;
                            endTime = task.inProgress() ? null : now;

                            let log = '['+now+']['+task.key+']';

                            if (userTask) {
                                if (task.inProgress()) {
                                    if (endTime) {
                                        // finished task which is in progress
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
                                } else {
                                    //already finished userTask, no update
                                }
                            } else if(user) {
                                if (endTime) {
                                    //console.log(log + '\tassigned but finished - ignoring');
                                    insert.push(app.getEntityConverterService().toUserTaskDbObject(new UserTaskDTO(
                                        null,
                                        task.id,
                                        user.id,
                                        now,
                                        now
                                    )));
                                    console.log(log + '\tnew finished task on ' + user.name);
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

    getByTaskIds(taskIds: number[]): Promise<UserTaskDTO[]> {
        return new Promise<UserTaskDTO[]>((resolve: Function): void => {

            this.getEntity().findAll({where: {task_id: {$in: taskIds}}, order: 'id ASC'}).then(
                (dbUserTasks: string[]): void => {

                    let result: UserTaskDTO[] = [];

                    for (let dbUserTask of dbUserTasks) {
                        result.push(app.getEntityConverterService().toUserTaskDTO(dbUserTask));
                    }

                    resolve(result);
                }

            )
        })
    }

    getStatsByTasks(tasks: TaskDTO[]): Promise<UserTaskSummaryDTO[]> {

        let taskIds: number[] = [0];
        let assignee: string[] = [];
        let task: TaskDTO;
        let uniq: any = {};

        for (task of tasks) {
            taskIds.push(task.id);
            if (-1 === assignee.indexOf(task.assignee)) {
                assignee.push(task.assignee);
            }
        }

        assignee = ("'" + assignee.join("','") + "'").split(',');

        return new Promise<UserTaskSummaryDTO[]> ((resolve: Function): void => {

            let query: string = 'SELECT ut.task_id, ut.user_id, min(ut.start_time) AS start_time, max(ut.end_time) AS end_time, ' +
                '( ' +
                'SELECT SUM(TIMESTAMPDIFF(SECOND, GREATEST(c.start_time, ut.start_time), ' +
                'LEAST( ' +
                'c.end_time, ' +
                'COALESCE(ut.end_time, UTC_TIMESTAMP()) ' +
                ') ' +
                ')) FROM userCalendars c ' +
                'WHERE ' +
                'c.start_time < COALESCE(ut.end_time, UTC_TIMESTAMP()) ' +
                'AND c.end_time > ut.start_time ' +
                'AND c.user_id = ut.user_id ' +
                ') AS spent_time ' +
                'FROM userTasks ut ' +
                'INNER JOIN users u ON u.id = ut.user_id ' +
                'WHERE ut.task_id IN (' + taskIds.join(',') + ') ' +
                'AND u.name IN (' + assignee.join(',') + ') ' +
                'GROUP BY ut.task_id, ut.user_id';

            app.getFramework().query(
                query
            ).then((res: any): void => {
                let dbItem: any;
                let item: UserTaskSummaryDTO;
                let items: UserTaskSummaryDTO[] = [];

                for (dbItem of res[0]) {
                    item = app.getEntityConverterService().toUserTaskSummaryDTO(dbItem);
                    items.push(item);
                }

                resolve(items);
            });
        });
    }

    protected getEntity(): Model<string, any> {
        return app.getEntity('UserTask');
    }

}