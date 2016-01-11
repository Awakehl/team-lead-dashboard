import {AppService} from "./app-service";
import {TaskDTO} from "../dto/task-dto";

declare var app: AppService;

export class JiraTasksService {

    getTasks():Promise<TaskDTO[]> {

        return app.getJiraTaskRepository().getTasks();
    }
}