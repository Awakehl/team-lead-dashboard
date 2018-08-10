/// <reference path="../../../typings/moment/moment.d.ts"/>

import {UserTaskDTO} from "../dto/user-task-dto";
import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import {TaskDTO} from "../dto/task-dto";
import Promise = require('bluebird');
import {AbstractRepository} from "./abstract-repository";
import Moment = moment.Moment;
import moment = require('moment');
import {TaskReportFilterDTO} from "../dto/task-report-filter-dto";

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
                            update.push(app.getEntityConverterService().toTaskDbObject(task));
                        } else if(!existing.hasOwnProperty(task.id)) {
                            insert.push(app.getEntityConverterService().toTaskDbObject(task));
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

    public getByIds(ids: number[]): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function): void => {

            this.getEntity().findAll({where: {id: {$in: ids}}}).then(
                (dbTasks: string[]): void => {

                    let result: TaskDTO[] = [];

                    for (let dbTask of dbTasks) {
                        result.push(app.getEntityConverterService().toTaskDTO(dbTask));
                    }

                    resolve(result);
                }

            )
        })
    }

    public getByDate(from: Moment): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function): void => {

            let sqlFrom: string = from.format('YYYY-MM-DD HH:mm:ss');
            this.getEntity().findAll({where:{
                updatedAt: {$gte: sqlFrom}
            }}).then(
                (dbTasks: string[]): void => {

                    let result: TaskDTO[] = [];

                    for (let dbTask of dbTasks) {
                        result.push(app.getEntityConverterService().toTaskDTO(dbTask));
                    }

                    resolve(result);
                }

            )
        })

    }

    public getByFilter(filter: TaskReportFilterDTO): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function): void => {

            let where: any = {};
            if (filter.epics) {
                where.epic_key = {$in: filter.epics}
            }
            if (filter.users) {
                where.assignee = {$in: filter.users}
            }
            this.getEntity().findAll({where:where}).then(
                (dbTasks: string[]): void => {

                    let result: TaskDTO[] = [];

                    for (let dbTask of dbTasks) {
                        result.push(app.getEntityConverterService().toTaskDTO(dbTask));
                    }

                    resolve(result);
                }

            )
        })

    }


    public getUnassignedTasks(epics: string[]): Promise<TaskDTO[]> {

        return new Promise<TaskDTO[]>((resolve: Function): void => {

            let filter:any = {
                assignee: null
            };
            if (epics) {
                filter['epic_key'] = {
                    $in: epics
                }
            }
            filter['status'] = {notIn: [
                'Closed', 'Done', 'Work done', 'Live'
            ]};

            filter['updatedAt']
                = {gt: moment().subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss')};

            this.getEntity().findAll({where: filter}).then(
                (dbTasks: string[]): void => {

                    let result: TaskDTO[] = [];

                    for (let dbTask of dbTasks) {
                        result.push(app.getEntityConverterService().toTaskDTO(dbTask));
                    }

                    resolve(result);
                }

            )
        })
    }

    protected getEntity(): Model<string, any> {
        return app.getEntity('Task');
    }
}