import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class UserCalendar {

    constructor() {
        return app.getFramework().define('userCalendar', {
            user_id: {
                type: app.getFramework().definition.INTEGER,

                references: {
                    model: app.getEntity('User'),

                    key: 'id'
                }
            },

            date: app.getFramework().definition.DATE,
            start_time: app.getFramework().definition.DATE,
            end_time: app.getFramework().definition.DATE,
        });
    }

}