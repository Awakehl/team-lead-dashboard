/// <reference path="./../../../typings/moment/moment.d.ts" />
/// <reference path="./../../../typings/bluebird/bluebird.d.ts" />

import {UserCalendarRepository} from "../repository/user-calendar-repository";
import {UserCalendarDTO} from "../dto/user-calendar-dto";
import Promise = require('bluebird');
export class UserCalendarService {

    private repository: UserCalendarRepository;

    public constructor(repository: UserCalendarRepository) {
        this.repository = repository;
    }

    getGroupedByUserIdsAndDates(userIds: number[], dates: string[]): Promise<{[userId: string]: {[date: string]: UserCalendarDTO[]}}> {

        return new Promise<{[userId: string]: {[date: string]: UserCalendarDTO[]}}>((resolve: Function): void => {
            let strUserId: string;
            let userCalendar: UserCalendarDTO;
            let result: {[userId: string]: {[date: string]: UserCalendarDTO[]}} = {};
            this.repository.getByUserIdsAndDates(userIds, dates).then((userCalendars: UserCalendarDTO[]): void => {

                for (userCalendar of userCalendars) {
                    strUserId = userCalendar.userId.toString();
                    if (!result.hasOwnProperty(strUserId)) {
                        result[strUserId] = {};
                    }
                    if (!result[strUserId].hasOwnProperty(userCalendar.date)) {
                        result[strUserId][userCalendar.date] = [];
                    }
                    result[strUserId][userCalendar.date].push(userCalendar);
                }

                resolve(result);
            });
        });

    }

    initUserCalendar(userId: number): Promise<void> {
        return this.repository.initUserCalendar(userId);
    }

}