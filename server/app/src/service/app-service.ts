/// <reference path="../../../typings/sequelize/sequelize.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

import {JiraTasksService} from "./jira-tasks-service";
import {Model} from "sequelize";
import {JiraTaskRepository} from "../repository/jira-task-repository";
import {ImportTasksService} from "./import-tasks-service";
declare var tl: any;
declare var _: any;

export class AppService {

    _ = require('lodash');


    getEntity(entity: string):Model<string, any> {
        return tl.Di.Container.getEntity;
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

    getJiraTaskRepository(): JiraTaskRepository {
        return tl.Di.Container.getRepository('JiraTaskRepository')
    };

    getTaskRepository(): JiraTaskRepository {
        return tl.Di.Container.getRepository('JiraTaskRepository')
    };

    getFramework(): any {
        return tl.Di.Container.getFramework();
    }
}