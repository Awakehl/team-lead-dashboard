AutoloadService = require('./src/service/autoload-service.js');

global.tl = AutoloadService.require(
    './src/di/',
    './src/framework/',
    './src/entity/',
    './src/repository/',
    './src/service/'
);

//AutoloadService.expose(exports);




tl.prototype = tl.Di.Container.getService('AppService');


console.log(tl);





/*require('./src/di/');
require('./src/frameworks/');
require('./src/entity/');
require('./src/repository/');
require('./src/service/');*/

//DI = require('./src/di/di.js');