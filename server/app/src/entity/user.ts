import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class User {

    constructor() {
        return app.getFramework().define('user', {
            name: app.getFramework().definition.STRING,
            displayName: app.getFramework().definition.STRING
        });
    }

}