export class TaskDTO {
    public id: number;
    public key: string;
    public assignee: string;
    public estimation: number;
    public summary: string;
    public status: string;
    public epicKey: string;

    constructor(id: number, key: string, assignee: string, estimation: number, summary: string, status: string, epicKey: string) {
        this.id = id;
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
        this.epicKey = epicKey;
    }

    inProgress(): boolean {
        return -1 !== ['dev in progress', 'in progress'].indexOf(this.status.toLowerCase())
    }

    isCompleted(): boolean {
        return -1 !== ['work done', 'verified', 'rc verified', 'live'].indexOf(this.status.toLowerCase())
    }

    isPaused(): boolean {
        return -1 !== ['on hold (dev)'].indexOf(this.status.toLowerCase())
    }
}