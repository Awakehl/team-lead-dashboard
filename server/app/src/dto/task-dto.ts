export class TaskDTO {
    public key: string;
    public assignee: string;
    public estimation: number;
    public summary: string;
    public status: string;

    constructor(key: string, assignee: string, estimation: number, summary: string, status: string) {
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
    }
}