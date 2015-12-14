'use strict';

require('./../../bootstrap.js');

var program = require('commander');

program
    .version('0.0.1');

for (var entity in tl.Entity) {
    console.log(app.getEntity(entity));
}

app.getFramework().sync().catch(function (e) {
    console.error(e);
});

console.log('OK');