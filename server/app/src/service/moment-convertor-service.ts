/// <reference path="../../../typings/moment/moment.d.ts"/>

import moment = require('moment');
import Moment = moment.Moment;

export class MomentConvertorService {

    toMysqlDateTime(moment: Moment): string {
        return moment.format('YYYY-MM-DD HH:mm:ss')
    }

}