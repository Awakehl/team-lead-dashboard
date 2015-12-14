'use strict';

require('./../../bootstrap.js');

var program = require('commander');

program
    .version('0.0.1');

app.getImportTasksService().import();

console.log('OK');