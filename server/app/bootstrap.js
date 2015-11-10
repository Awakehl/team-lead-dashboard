AutoloadService = require('./src/service/autoload-service.js');

exports = AutoloadService.require(
    './src/di/',
    './src/frameworks/'
    //'./src/entity/',
    //'./src/repository/',
    //'./src/service/'
);

AutoloadService.expose(exports);

console.log(Di);

/*require('./src/di/');
require('./src/frameworks/');
require('./src/entity/');
require('./src/repository/');
require('./src/service/');*/

//DI = require('./src/di/di.js');