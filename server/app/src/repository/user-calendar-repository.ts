/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>

import {AppService} from "../service/app-service";
import {Model} from "sequelize";
import {EntityConverterService} from "../service/entity-converter-service";
import Promise = require('bluebird');
import moment = require('moment');
import {AbstractRepository} from "./abstract-repository";
import {UserCalendarDTO} from "../dto/user-calendar-dto";

declare var app: AppService;

export class UserCalendarRepository extends AbstractRepository {

    public getByUserIdsAndDates(userIds: number[], dates: string[]):Promise<UserCalendarDTO[]> {

        return new Promise<UserCalendarDTO[]>((resolve): void => {

            let userCalendar: UserCalendarDTO;
            let result: UserCalendarDTO[];

            app.getEntity('UserCalendar').findAll({where: {$and: [
                {date: {$in: dates}},
                {user_id: {$in: userIds}}
            ]}}).then((dbUserCalendars: string[]) => {

                for (let dbUserCalendar of dbUserCalendars) {
                    userCalendar = app.getEntityConverterService().toUserCalendarDTO(dbUserCalendar);
                    result.push(userCalendar);
                }

                resolve(result);

            });
        });
    }

    initUserCalendar(userId: number): Promise<void> {

        return new Promise<void>((resolve): void => {

            var now: String = moment().utc().format('YYYY-MM-DD HH:mm:ss');
            app.getFramework().query(
                'SELECT IFNULL(MAX(date), 0) AS maxDate FROM userCalendars where user_id = ' + userId + ' LIMIT 1'
            ).then((res: any): void => {
                let startTime: String = res[0][0]['maxDate'];

                app.getFramework().query(
                    'INSERT INTO userCalendars(`user_id`, `date`, `start_time`, `end_time`, `createdAt`, `updatedAt`) ' +
                    'SELECT '+userId+', `dt`, `dt` + INTERVAL 10 HOUR, `dt` + INTERVAL 13 HOUR, "' + now + '", "' + now + '" ' +
                    'FROM refCalendar WHERE refCalendar.isholiday = 0 ' +
                    'AND refCalendar.isweekday = 1 AND refCalendar.dyw != 6 ' +
                    'AND refCalendar.dt > "' + startTime + '"'
                ).then((): void => {
                    app.getFramework().query(
                        'INSERT INTO userCalendars(`user_id`, `date`, `start_time`, `end_time`, `createdAt`, `updatedAt`) ' +
                        'SELECT '+userId+', `dt`, `dt` + INTERVAL 14 HOUR, `dt` + INTERVAL 19 HOUR, "' + now + '", "' + now + '" ' +
                        'FROM refCalendar WHERE refCalendar.isholiday = 0 ' +
                        'AND refCalendar.isweekday = 1 AND refCalendar.dyw != 6 ' +
                        'AND refCalendar.dt > "' + startTime + '"'
                    ).then((): void => {
                        resolve();
                    });
                });
            });
        });
    }

    protected getEntity(): Model<string, any> {
        return app.getEntity('UserCalendar');
    }

}