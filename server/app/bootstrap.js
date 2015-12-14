var autoloadService = require('./src/service/autoload-service.js');

global.tl = autoloadService.require(
    './src/di/',
    './src/framework/',
    './src/entity/',
    './src/repository/',
    './src/service/',
    './src/conf/'
);

/** @var {AppService} app **/
var app = tl.Di.Container.getService('appService');

global.app = app;