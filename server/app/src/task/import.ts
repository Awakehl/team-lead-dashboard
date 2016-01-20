import {AppService} from "../service/app-service";
declare var app: AppService;

require('./../../bootstrap.js');

let program = require('commander');

program
    .version('0.0.1');

app.getImportTasksService().import().then(():void => {
    console.log('OK');
    process.exit();
});
