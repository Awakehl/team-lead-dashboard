/// <reference path="./../../../typings/moment/moment.d.ts" />

import {TaskService} from "./task-service";
import {UserTaskService} from "./user-task-service";
import {UserService} from "./user-service";
import moment = require('moment');
import {TaskDTO} from "../dto/task-dto";
import {UserTaskDTO} from "../dto/user-task-dto";
import {UserDTO} from "../dto/user-dto";
import {TaskReportDTO} from "../dto/task-report-dto";

export class TaskReportService {

    private taskService: TaskService;
    private userTaskService: UserTaskService;
    private userService: UserService;

    constructor(taskService: TaskService, userTaskService: UserTaskService, userService: UserService) {
        this.taskService = taskService;
        this.userTaskService = userTaskService;
        this.userService = userService;
    }

    getReport(): Promise<TaskReportDTO> {

        return new Promise<TaskReportDTO>((resolve: Function): void => {
            let from = moment().subtract(1, 'week');

            this.userTaskService.getByDate(from).then((userTasksResults: UserTaskDTO[]): void => {

                let taskIds: number[] = [];
                let userTask: UserTaskDTO;
                let tasksResults: TaskDTO[] = null;
                let userResults: UserDTO[] = null;
                let resolveWhenFinished: Function = (): void => {
                    if (tasksResults && userResults) {
                        resolve(new TaskReportDTO(tasksResults, userTasksResults, userResults));
                    }
                };

                for (userTask of userTasksResults) {
                    taskIds.push(userTask.taskId);
                }

                this.taskService.getByIds(taskIds).then((tasks:TaskDTO[]): void => {
                    tasksResults = tasks;
                    resolveWhenFinished();
                });

                this.userService.getAll().then((users:UserDTO[]): void => {
                    userResults = users;
                    resolveWhenFinished();
                });

            })
        })
    }

}