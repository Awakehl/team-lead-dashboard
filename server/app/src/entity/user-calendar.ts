import {AppService} from "../service/app-service";
import {UserTaskDTO} from "../dto/user-task-dto";

declare var app: AppService;

export class UserCalendar {

    constructor() {
        return app.getFramework().define('userCalendar', {
            name: app.getFramework().definition.STRING,

            user_id: {
                type: app.getFramework().definition.INTEGER,

                references: {
                    model: app.getEntity('User'),

                    key: 'id'
                }
            },

            date: app.getFramework().definition.DATE,
            startTime: app.getFramework().definition.DATE,
            endTime: app.getFramework().definition.DATE,
            standUp: { type: app.getFramework().definition.BOOLEAN, allowNull: false, defaultValue: true }
        });
    }

}