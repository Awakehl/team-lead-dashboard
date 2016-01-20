require('./../../bootstrap.js');
var program = require('commander');
program
    .version('1.0.0');
var update = function () {
    app.getImportTasksService().import();
};
update();
setInterval(update, 30000);
