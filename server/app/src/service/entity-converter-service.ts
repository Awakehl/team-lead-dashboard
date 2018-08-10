import {UserTaskDTO} from "../dto/user-task-dto";
import {TaskDTO} from "../dto/task-dto";
import {UserDTO} from "../dto/user-dto";
import {UserCalendarDTO} from "../dto/user-calendar-dto";
import {UserTaskSummaryDTO} from "../dto/user-task-summary-dto";

export class EntityConverterService {

    toTaskDTO(model: any): TaskDTO {

        return new TaskDTO(
            model['id'],
            model['key'],
            model['assignee'],
            model['estimation'],
            model['summary'],
            model['status'],
            model['epic_key']
        );
    }

    toTaskDbObject(entity: TaskDTO): any {

        return {
            id: entity.id,
            key: entity.key,
            assignee: entity.assignee,
            estimation: entity.estimation,
            summary: entity.summary,
            status: entity.status,
            epic_key: entity.epicKey
        };
    }

    toUserTaskDTO(model: any): UserTaskDTO {

        return new UserTaskDTO(
            model['id'],
            model['task_id'],
            model['user_id'],
            model['start_time'],
            model['end_time']
        );
    }

    toUserTaskDbObject(entity: UserTaskDTO): any {

        return {
            id: entity.id,
            task_id: entity.taskId,
            user_id: entity.userId,
            start_time: entity.startTime,
            end_time: entity.endTime
        };
    }

    toUserDTO(model: any): UserDTO {

        return new UserDTO(
            model['id'],
            model['name'],
            model['displayName']
        );
    }

    toUserCalendarDTO(model: any): UserCalendarDTO {

        return new UserCalendarDTO(
            model['id'],
            model['user_id'],
            model['date'],
            model['start_time'],
            model['end_time']
        );
    }

    toUserTaskSummaryDTO(model: any): UserTaskSummaryDTO {
        return new UserTaskSummaryDTO(
            model['task_id'],
            model['user_id'],
            model['start_time'],
            model['end_time'],
            model['spent_time']
        );
    }

    isEquals(modelOne: any, modelTwo: any): boolean {

        return JSON.stringify(modelOne) == JSON.stringify(modelTwo);
    }


}