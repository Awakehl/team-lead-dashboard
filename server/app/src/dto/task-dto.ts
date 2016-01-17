export class TaskDTO {
    public id: number;
    public key: string;
    public assignee: string;
    public estimation: number;
    public summary: string;
    public status: string;

    constructor(id: number, key: string, assignee: string, estimation: number, summary: string, status: string) {
        this.id = id;
        this.key = key;
        this.assignee = assignee;
        this.estimation = estimation;
        this.summary = summary;
        this.status = status;
    }
}