import {UserTaskDTO} from "../dto/user-task-dto";
import {TaskDTO} from "../dto/task-dto";
import {UserDTO} from "../dto/user-dto";

export class EntityConverterService {

    toTaskDTO(model: any): TaskDTO {

        return new TaskDTO(
            model['id'],
            model['key'],
            model['assignee'],
            model['estimation'],
            model['summary'],
            model['status']
        );
    }

    toUserTaskDTO(model: any): UserTaskDTO {

        return new UserTaskDTO(
            model['key'],
            model['userId']
        );
    }

    toUserDTO(model: any): UserDTO {

        return new UserDTO(
            model['id'],
            model['name']
        );
    }

    isEquals(modelOne: any, modelTwo: any): boolean {

        return JSON.stringify(modelOne) == JSON.stringify(modelTwo);
    }


}