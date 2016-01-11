import {UserTaskDTO} from "../dto/user-task-dto";
import {TaskDTO} from "../dto/task-dto";

export class EntityConverterService {

    toTaskDTO(model: any): TaskDTO {

        return new TaskDTO(
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

    isEquals(modelOne: any, modelTwo: any): boolean {

        return JSON.stringify(modelOne) == JSON.stringify(modelTwo);
    }


}