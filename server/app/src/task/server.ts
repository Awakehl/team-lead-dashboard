/// <reference path="../../../typings/node/node.d.ts"/>

// TODO: routing

import {AppService} from "../service/app-service";
import {TaskReportDTO} from "../dto/task-report-dto";

declare var app: AppService;

require('./../../bootstrap.js');

app.getTaskReportService().getReport().then(
    (taskReport: TaskReportDTO): void => {
        process.stdout.write(JSON.stringify(taskReport));
        process.exit(0);
    }
);


