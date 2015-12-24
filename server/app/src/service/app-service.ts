import {JiraTasksService} from "./jira-tasks-service";
declare var tl: any;
export class AppService {


    getEntity(entity: string):Model {
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
}