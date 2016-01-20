export class UserTaskDTO {
    public id: number;
    public taskId: number;
    public userId: number;
    public startTime: string;
    public endTime: string;

    constructor(id: number, taskId: number, userId: number, startTime: string, endTime: string) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}