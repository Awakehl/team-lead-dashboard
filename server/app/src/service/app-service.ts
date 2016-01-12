/// <reference path="../../../typings/sequelize/sequelize.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

import {JiraTasksService} from "./jira-tasks-service";
import {Model} from "sequelize";
import {JiraTaskRepository} from "../repository/jira-task-repository";
import {ImportTasksService} from "./import-tasks-service";
import {EntityConverterService} from "./entity-converter-service";
import {TaskRepository} from "../repository/task-repository";
import {TaskService} from "./task-service";
import {UserRepository} from "../repository/user-repository";
import {UserService} from "./user-service";
declare var tl: any;
declare var _: any;

export class AppService {

    _ = require('lodash');


    getEntity(entity: string):Model<string, any> {
        return tl.Di.Container.getEntity(entity);
    }

    getConf(name: string): any {
        return tl.Conf[this._.capitalize(name)]
    };

    getService(name: string): any {
        return tl.Di.Container.getService(name);
    };

    getJiraTasksService(): JiraTasksService {
        return tl.Di.Container.getService('JiraTasksService');
    };

    getImportTasksService(): ImportTasksService {
        return tl.Di.Container.getService('ImportTasksService');
    }

    getEntityConverterService(): EntityConverterService {
        return tl.Di.Container.getService('EntityConverterService');
    }

    getJiraTaskRepository(): JiraTaskRepository {
        return tl.Di.Container.getRepository('JiraTaskRepository')
    };

    getTaskRepository(): TaskRepository {
        return tl.Di.Container.getRepository('TaskRepository')
    };

    getUserRepository(): UserRepository {
        return tl.Di.Container.getRepository('UserRepository')
    };

    getUserService(): UserService {
        return tl.Di.Container.getService('UserService')
    };


    getTaskService(): TaskService {
        return tl.Di.Container.getService('TaskService')
    };

    getFramework(): any {
        return tl.Di.Container.getFramework();
    }
}