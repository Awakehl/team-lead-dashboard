import {TaskDTO} from "../dto/task-dto";
import {TaskService} from "./task-service";
import {UserService} from "./user-service";
import {JiraTasksService} from "./jira-tasks-service";

export class ImportTasksService {

    private jiraTaskService: JiraTasksService;
    private taskService: TaskService;
    private userService: UserService;

    constructor(jiraTaskService: JiraTasksService, taskService: TaskService, userService: UserService) {
        this.jiraTaskService = jiraTaskService;
        this.taskService = taskService;
        this.userService = userService;
    }

    import(): void {

       this.jiraTaskService
           .getTasks()
           .then((tasks: TaskDTO[]): Promise<TaskDTO[]> => {
               return this.taskService.importTasks(tasks);
           })
           .then((tasks: TaskDTO[]): Promise<void> => {
               return this.userService.importUsersFromTasks(tasks);
           })

    }
}