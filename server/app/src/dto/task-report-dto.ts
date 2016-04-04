import {TaskDTO} from "./task-dto";
import {UserTaskDTO} from "./user-task-dto";
import {User} from "../entity/user";
import {UserTaskSummaryDTO} from "./user-task-summary-dto";
export class TaskReportDTO {
    public tasks: TaskDTO[];
    public userTasksSummary: UserTaskSummaryDTO[];
    public users: User[];
    public unassignedTasks: TaskDTO[];

    constructor(tasks: TaskDTO[], userTasksSummary: UserTaskSummaryDTO[], users: User[], unassignedTasks: TaskDTO[]) {
        this.tasks = tasks;
        this.userTasksSummary = userTasksSummary;
        this.users = users;
        this.unassignedTasks = unassignedTasks;
    }
}