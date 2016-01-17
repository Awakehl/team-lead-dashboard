export class UserTaskDTO {
    public key: string;
    public userId: number;
    public startTime: string;
    public endTime: string;

    constructor(key: string, userId: number, startTime: string, endTime: string) {
        this.key = key;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}