import {AppService} from "./app-service";
declare var app: AppService;

export class ImportTasksService {

    import():void {

        var jiraTasksPromise = app.getJiraTasksService().getTasks();

        jiraTasksPromise.then()

    }

    private syncTasks(TaskDTO[]) {

    }

}