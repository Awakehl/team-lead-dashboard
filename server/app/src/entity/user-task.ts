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

            start_time: {
                type: app.getFramework().definition.DATE
            },

            end_time: {
                type: app.getFramework().definition.DATE
            },
        });
    }

}