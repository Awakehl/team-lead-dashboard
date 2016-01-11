import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class Task {

    constructor() {
        return app.getFramework().define('task', {
            key: app.getFramework().definition.STRING,
            assignee: app.getFramework().definition.STRING,
            estimation: app.getFramework().definition.DOUBLE,
            summary: app.getFramework().definition.STRING,
            status: app.getFramework().definition.STRING,
        });
    }

}