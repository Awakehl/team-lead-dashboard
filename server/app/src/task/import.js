var import_filter_dto_1 = require("../dto/import-filter-dto");
require('./../../bootstrap.js');
var program = require('commander');
program
    .version('1.0.0');
var stdio = require('stdio');
var ops = stdio.getopt({
    'short': { args: 1 },
    'long': { args: 1 }
});
var short = ops.short ? +ops.short : 3;
var long = ops.long ? +ops.long : 30;
var filter = new import_filter_dto_1.ImportFilterDTO(short, long);
var update = function () {
    app.getImportTasksService().import(filter);
};
update();
setInterval(update, 30000);
