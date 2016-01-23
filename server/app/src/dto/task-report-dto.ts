import {TaskDTO} from "./task-dto";
import {UserTaskDTO} from "./user-task-dto";
import {User} from "../entity/user";
export class TaskReportDTO {
    public tasks: TaskDTO[];
    public userTasks: UserTaskDTO[];
    public users: User[];

    constructor(tasks: TaskDTO[], userTasks: UserTaskDTO[], users: User[]) {
        this.tasks = tasks;
        this.userTasks = userTasks;
        this.users = users;
    }
}