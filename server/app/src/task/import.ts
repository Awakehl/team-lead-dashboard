import {AppService} from "../service/app-service";
declare var app: AppService;

require('./../../bootstrap.js');

let program = require('commander');

program
    .version('1.0.0');

app.getImportTasksService().import().then(():void => {
    process.exit();
});
