require('./../../bootstrap.js');
var program = require('commander');
program
    .version('1.0.0');
app.getImportTasksService().import().then(function () {
    process.exit();
});
