/// <reference path="../../../typings/node/node.d.ts"/>

// TODO: routing

import {AppService} from "../service/app-service";
import {TaskReportDTO} from "../dto/task-report-dto";
import {TaskReportFilterDTO} from "../dto/task-report-filter-dto";

declare var app: AppService;

require('./../../bootstrap.js');

let stdio: any = require('stdio');
let ops: any = stdio.getopt({
    'epics': {args: 1},
    'users': {args: 1},
});

let epics: string[] = ops.epics ? ops.epics.split(',') : null;
let users: string[] = ops.users ? ops.users.split(',') : null;

let filter: TaskReportFilterDTO = new TaskReportFilterDTO(epics, users);

app.getTaskReportService().getReport(filter).then(
    (taskReport: TaskReportDTO): void => {
        process.stdout.write(JSON.stringify(taskReport));
        process.exit(0);
    }
);


