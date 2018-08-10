/// <reference path="./../../../typings/moment/moment.d.ts" />

import {TaskService} from "./task-service";
import {UserTaskService} from "./user-task-service";
import {UserService} from "./user-service";
import moment = require('moment');
import {TaskDTO} from "../dto/task-dto";
import {UserTaskDTO} from "../dto/user-task-dto";
import {UserDTO} from "../dto/user-dto";
import {TaskReportDTO} from "../dto/task-report-dto";
import Promise = require('bluebird');
import {UserTaskSummaryDTO} from "../dto/user-task-summary-dto";
import {UserCalendarService} from "./user-calendar-service";
import {UserCalendarDTO} from "../dto/user-calendar-dto";
import {TaskReportFilterDTO} from "../dto/task-report-filter-dto";

export class TaskReportService {

    private taskService: TaskService;
    private userTaskService: UserTaskService;
    private userService: UserService;
    private userCalendarService: UserCalendarService;

    constructor(
        taskService: TaskService,
        userTaskService: UserTaskService,
        userService: UserService,
        userCalendarService: UserCalendarService
    ) {
        this.taskService = taskService;
        this.userTaskService = userTaskService;
        this.userService = userService;
        this.userCalendarService = userCalendarService;
    }

    getReport(filter: TaskReportFilterDTO): Promise<TaskReportDTO> {

        return new Promise<TaskReportDTO>((resolve: Function): void => {
            let from = moment().subtract(1, 'week');

            let promise: Promise<TaskDTO[]> = filter.epics || filter.users ?  this.taskService.getByFilter(filter) : this.taskService.getByDate(from);
            promise.then((taskResults: TaskDTO[]): void => {

                let userTaskSummaryResults: UserTaskSummaryDTO[] = null;
                let userTaskSummary: UserTaskSummaryDTO;
                let userResults: UserDTO[] = null;
                let unassignedTaskResults: TaskDTO[] = null;
                let userIds: number[] = [];

                let resolveWhenFinished: Function = (): void => {
                    if (userTaskSummaryResults && userResults && unassignedTaskResults) {
                        resolve(new TaskReportDTO(taskResults, userTaskSummaryResults, userResults, unassignedTaskResults));
                    }
                };

                this.userTaskService.getStatsByTasks(taskResults).then((userTasksSummary:UserTaskSummaryDTO[]): void => {
                    userTaskSummaryResults = userTasksSummary;
                    for (userTaskSummary of userTasksSummary) {
                        userIds.push(userTaskSummary.userId);
                    }

                    this.userService.getByIds(userIds)
                    .then((users:UserDTO[]): void => {
                        userResults = users;
                        resolveWhenFinished();
                    });
                });

                this.taskService.getUnassignedTasks(filter.epics).then((tasks:TaskDTO[]):void => {
                    unassignedTaskResults = tasks;
                    resolveWhenFinished();
                });

            });

        })

    }

}