import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class UserTask {

    constructor() {
        return app.getFramework().define('userTask', {
            user_id: {
                type: app.getFramework().definition.INTEGER,
                references: {
                    model: app.getEntity('User')
                }
            },

            task_id: {
                type: app.getFramework().definition.INTEGER,
                references: {
                    model: app.getEntity('Task')
                }
            },

            startTime: app.getFramework().definition.DATE,
            endTime: app.getFramework().definition.DATE
        });
    }

}