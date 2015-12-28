import {JiraTasksService} from "./jira-tasks-service";
import {Model} from "sequelize";
import {JiraTaskRepositiry} from "../repository/jira-task-repository";
declare var tl: any;
export class AppService {


    getEntity(entity: string):Model<string, any> {
        return tl.Di.Container.getEntity;
    }

    getConf(name: string): any {
        return tl.Conf[_.capitalize(name)]
    };

    getService(name: string): any {
        return tl.Di.Container.getService(name);
    };

    getJiraTasksService(): JiraTasksService {
        return tl.Di.Container.getService('JiraTasksService');
    };

    getJiraTaskRepository(): JiraTaskRepositiry {
        return tl.Di.Container.getRepository('JraTaskRepository')
    };

    getFramework(): any {
        return tl.Di.Container.getFramework();
    }
}