import {UserTaskDTO} from "../dto/user-task-dto";
import {Promise} from "../../../node_modules/typescript/lib/lib.es6";
export class UserTaskRepository {

    public getTasks():Promise<Array<UserTaskDTO>> {

        var promise: Promise<UserTaskDTO[]>;



        return promise;

    }

}