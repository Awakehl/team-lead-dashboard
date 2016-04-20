import {AppService} from "../service/app-service";

require('./../../bootstrap.js');

declare var app: AppService;

app.getInitUserCalendarService().initUsers();

console.log('OK');

