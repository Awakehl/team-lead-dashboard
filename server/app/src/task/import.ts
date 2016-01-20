import {AppService} from "../service/app-service";
import Function0 = _.Function0;
declare var app: AppService;

require('./../../bootstrap.js');

let program = require('commander');

program
    .version('1.0.0');

let update: Function = () => {
    app.getImportTasksService().import();
};
update();
setInterval(update, 30000);