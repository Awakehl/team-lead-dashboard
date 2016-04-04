import {TaskDTO} from "../dto/task-dto";
import {TaskService} from "./task-service";
import {UserService} from "./user-service";
import {JiraTasksService} from "./jira-tasks-service";
import {UserTaskService} from "./user-task-service";

import Promise = require('bluebird');
import {UserDTO} from "../dto/user-dto";
import {ImportFilterDTO} from "../dto/import-filter-dto";

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

    import(filter: ImportFilterDTO): Promise<TaskDTO[]> {

       return this.userService.getAll()
            .then((users: UserDTO[]): Promise<TaskDTO[]> => {
                return this.jiraTaskService.getTasks(users, filter);
            })
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