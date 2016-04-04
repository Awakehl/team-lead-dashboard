import {AppService} from "../service/app-service";
import {ImportFilterDTO} from "../dto/import-filter-dto";
declare var app: AppService;

require('./../../bootstrap.js');

let program = require('commander');

program
    .version('1.0.0');

let stdio: any = require('stdio');
let ops: any = stdio.getopt({
    'short': {args: 1},
    'long': {args: 1},
});

let short: number = ops.short ? +ops.short : 3;
let long: number = ops.long ? +ops.long : 30;

let filter: ImportFilterDTO = new ImportFilterDTO(short, long);

let update: Function = () => {
    app.getImportTasksService().import(filter);
};
update();
setInterval(update, 30000);