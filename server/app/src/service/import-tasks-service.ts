import {TaskDTO} from "../dto/task-dto";
import {TaskService} from "./task-service";
import {UserService} from "./user-service";
import {JiraTasksService} from "./jira-tasks-service";
import {UserTaskService} from "./user-task-service";

import Promise = require('bluebird');

export class ImportTasksService {

    private jiraTaskService: JiraTasksService;
    private taskService: TaskService;
    private userService: UserService;
    private userTaskService: UserTaskService;

    constructor(jiraTaskService: JiraTasksService, taskService: TaskService, userService: UserService,
                userTaskService: UserTaskService) {
        this.jiraTaskService = jiraTaskService;
        this.taskService = taskService;
        this.userService = userService;
        this.userTaskService = userTaskService;
    }

    import(): Promise<TaskDTO[]> {

       return this.jiraTaskService
           .getTasks()
           .then((tasks: TaskDTO[]): Promise<TaskDTO[]> => {
               return this.taskService.importTasks(tasks);
           })
           .then((tasks: TaskDTO[]): Promise<TaskDTO[]> => {
               return this.userService.importUsersFromTasks(tasks);
           })
           .then((tasks: TaskDTO[]): Promise<TaskDTO[]> => {
               return this.userTaskService.update(tasks);
           })

    }
}