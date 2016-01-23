/// <reference path="../typings/angularjs/angular.d.ts"/>

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('TaskController', ['$scope', '$http',
    ($scope, $http): void => {

        let update: Function = () => {

            $http.get('tasks/users').success(function(data) {

                let userData: any = {};
                let userById: any = {};
                let taskById: any = {};

                for(let user of data.users) {
                    userById[user.id] = user.name;
                    userData[user.name] = {}
                }

                for(let task of data.tasks) {
                    taskById[task.id] = task;
                }

                for(let userTask of data.userTasks) {
                    let task = taskById[userTask.taskId];
                    let user = userById[userTask.userId];
                    let status: string = task.status.toLowerCase();
                    let userItem: any = userData[user];
                    if (!userItem.hasOwnProperty(status)) {
                        userItem[status] = [];
                    }
                    userItem[status].push(task);
                }

                console.log(userData);

                $scope.data = userData;
            });

        };

        update();
        setInterval(update, 30000);
    }
]);