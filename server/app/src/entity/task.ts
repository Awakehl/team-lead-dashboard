import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class Task {

    constructor() {
        return app.getFramework().define('task', {
            key: app.getFramework().definition.STRING,
            summary: app.getFramework().definition.STRING,
            estimation: app.getFramework().definition.DOUBLE,
            status: app.getFramework().definition.INTEGER
        });
    }

}