import {AppService} from "./app-service";
import {TaskDTO} from "../dto/task-dto";
import Promise = require('bluebird');
import {UserDTO} from "../dto/user-dto";
import {ImportFilterDTO} from "../dto/import-filter-dto";

declare var app: AppService;

export class JiraTasksService {

    getTasks(users: UserDTO[], filter: ImportFilterDTO):Promise<TaskDTO[]> {

        return app.getJiraTaskRepository().getTasks(users, filter);
    }
}