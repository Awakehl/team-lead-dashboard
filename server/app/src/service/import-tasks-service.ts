import {AppService} from "./app-service";
import {TaskDTO} from "../dto/task-dto";

declare var app: AppService;

export class ImportTasksService {

    import(): void {

       app.getJiraTasksService().getTasks().then(function(tasks: TaskDTO[]): void {
           console.log(tasks);

           app.getTaskService().importTasks(tasks).then(function () {

               console.log('imported');
           });


       });


    }

    /*private syncTasks(TaskDTO[]): void {

    }*/

}