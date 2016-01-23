/// <reference path="../typings/angularjs/angular.d.ts"/>

let app = angular.module('dashboardApp', [
    'ngRoute',
    'dashboardControllers'
]);

app.config(['$routeProvider',
    ($routeProvider): void => {
        $routeProvider.
            when('/tasks', {
                templateUrl: 'partials/tasks.html',
                controller: 'TaskController'
            });
    }
]);