export class UserCalendarDTO {
    public id: number;
    public userId: number;
    public date: string;
    public startTime: string;
    public endTime: string;

    constructor(id: number, userId: number, date: string, startTime: string, endTime: string) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}