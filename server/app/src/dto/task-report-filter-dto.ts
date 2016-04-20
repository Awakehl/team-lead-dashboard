export class TaskReportFilterDTO {
    public epics: string[];
    public users: string[];

    constructor(epics: string[], users: string[]) {
        this.epics = epics;
        this.users = users;
    }
}