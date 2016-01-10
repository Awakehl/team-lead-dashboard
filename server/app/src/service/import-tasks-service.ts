import {AppService} from "./app-service";
import {TaskDTO} from "../dto/task-dto";
import {Promise} from "../../../../promise/node_modules/typescript/lib/lib.core.es6";
declare var app: AppService;

export class ImportTasksService {

    import(): void {

       app.getJiraTasksService().getTasks().then(function(tasks: TaskDTO): void {
        app.getT
       })


    }

    /*private syncTasks(TaskDTO[]): void {

    }*/

}