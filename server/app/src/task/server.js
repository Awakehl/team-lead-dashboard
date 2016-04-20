/// <reference path="../../../typings/node/node.d.ts"/>
var task_report_filter_dto_1 = require("../dto/task-report-filter-dto");
require('./../../bootstrap.js');
var stdio = require('stdio');
var ops = stdio.getopt({
    'epics': { args: 1 },
    'users': { args: 1 }
});
var epics = ops.epics ? ops.epics.split(',') : null;
var users = ops.users ? ops.users.split(',') : null;
var filter = new task_report_filter_dto_1.TaskReportFilterDTO(epics, users);
app.getTaskReportService().getReport(filter).then(function (taskReport) {
    process.stdout.write(JSON.stringify(taskReport));
    process.exit(0);
});
