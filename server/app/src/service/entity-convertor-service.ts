import {UserTaskDTO} from "../dto/user-task-dto";
import {Model} from "sequelize";

export class EntityConverterService {

    static toUserTaskDTO(model: Model): UserTaskDTO {

        return new UserTaskDTO(
            model['key'],
            model['userId']
        );
    }
}