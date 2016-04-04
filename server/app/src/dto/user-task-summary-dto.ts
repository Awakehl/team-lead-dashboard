import {UserTaskDTO} from "./user-task-dto";
export class UserTaskSummaryDTO {

    public taskId: number;
    public userId: number;
    public startTime: string;
    public endTime: string;
    public spentTime: number;

    constructor(taskId: number, userId: number, startTime: string, endTime: string, spentTime: number) {
        this.taskId = taskId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.spentTime = spentTime;
    }
}