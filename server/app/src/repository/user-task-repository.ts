import {UserTaskDTO} from "../dto/user-task-dto";
import {Promise} from "../../../node_modules/typescript/lib/lib.es6";
import {AppService} from "../service/app-service";

declare var app: AppService;

export class UserTaskRepository {

    public getTasks():Promise<Array<UserTaskDTO>> {

        var promise: Promise<UserTaskDTO[]>;

        app.getEntity('UserTask').findAll();


        return promise;

    }

}