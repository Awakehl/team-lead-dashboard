import {UserTaskDTO} from "../dto/user-task-dto";
import {Model} from "sequelize";
import {TaskDTO} from "../dto/task-dto";

export class EntityConverterService {

    static toTaskDTO(model: Model): TaskDTO {

        return new TaskDTO(
            model['key'],
            model['assignee'],
            model['estimation'],
            model['summary'],
            model['status']
        );
    }

    static toUserTaskDTO(model: Model): UserTaskDTO {

        return new UserTaskDTO(
            model['key'],
            model['userId']
        );
    }


}