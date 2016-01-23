/// <reference path="../../../typings/node/node.d.ts"/>
require('./../../bootstrap.js');
app.getTaskReportService().getReport().then(function (taskReport) {
    process.stdout.write(JSON.stringify(taskReport));
    process.exit(0);
});
