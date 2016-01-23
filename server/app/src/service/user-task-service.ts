/// <reference path="./../../../typings/moment/moment.d.ts" />

import {TaskDTO} from "../dto/task-dto";
import {UserTaskRepository} from "../repository/user-task-repository";

import Moment = moment.Moment;
import {UserTaskDTO} from "../dto/user-task-dto";

export class UserTaskService {

    private repository: UserTaskRepository;

    public constructor(repository: UserTaskRepository) {
        this.repository = repository;
    }

    update(tasks: TaskDTO[]): Promise<TaskDTO[]> {
        return this.repository.update(tasks);
    }

    getByDate(from: Moment): Promise<UserTaskDTO[]> {
        return this.repository.getByDate(from);
    }
}