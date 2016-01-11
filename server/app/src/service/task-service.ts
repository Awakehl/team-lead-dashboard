import {AppService} from "./app-service";
import {TaskDTO} from "../dto/task-dto";
declare var app: AppService;

export class TaskService {


    importTasks(tasks: TaskDTO[]):Promise<void> {

        return app.getTaskRepository().updateOrInsertTasks(tasks);

    }

}