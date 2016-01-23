/// <reference path="../typings/angularjs/angular.d.ts"/>
var dashboardControllers = angular.module('dashboardControllers', []);
dashboardControllers.controller('TaskController', ['$scope', '$http',
    function ($scope, $http) {
        var update = function () {
            $http.get('tasks/users').success(function (data) {
                var userData = {};
                var userById = {};
                var taskById = {};
                for (var _i = 0, _a = data.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    userById[user.id] = user.name;
                    userData[user.name] = {};
                }
                for (var _b = 0, _c = data.tasks; _b < _c.length; _b++) {
                    var task = _c[_b];
                    taskById[task.id] = task;
                }
                for (var _d = 0, _e = data.userTasks; _d < _e.length; _d++) {
                    var userTask = _e[_d];
                    var task = taskById[userTask.taskId];
                    var user = userById[userTask.userId];
                    var status_1 = task.status.toLowerCase();
                    var userItem = userData[user];
                    if (!userItem.hasOwnProperty(status_1)) {
                        userItem[status_1] = [];
                    }
                    userItem[status_1].push(task);
                }
                console.log(userData);
                $scope.data = userData;
            });
        };
        update();
        setInterval(update, 30000);
    }
]);
