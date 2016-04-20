/// <reference path="../typings/angularjs/angular.d.ts"/>
var app = angular.module('dashboardApp', [
    'ngRoute',
    'dashboardControllers'
]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/tasks', {
            templateUrl: 'partials/tasks.html',
            controller: 'TaskController'
        });
    }
]);
