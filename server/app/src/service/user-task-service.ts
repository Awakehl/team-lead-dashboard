/// <reference path="./../../../typings/moment/moment.d.ts" />

import {TaskDTO} from "../dto/task-dto";
import {UserTaskRepository} from "../repository/user-task-repository";

import {UserTaskDTO} from "../dto/user-task-dto";
import {UserTaskSummaryDTO} from "../dto/user-task-summary-dto";

export class UserTaskService {

    private repository: UserTaskRepository;

    public constructor(repository: UserTaskRepository) {
        this.repository = repository;
    }

    update(tasks: TaskDTO[]): Promise<TaskDTO[]> {
        return this.repository.update(tasks);
    }

    getByTaskIds(taskIds: number[]): Promise<UserTaskDTO[]> {
        return this.repository.getByTaskIds(taskIds);
    }

    getStatsByTasks(tasks: TaskDTO[]): Promise<UserTaskSummaryDTO[]> {
        return this.repository.getStatsByTasks(tasks);
    }

}