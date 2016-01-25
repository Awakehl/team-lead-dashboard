/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/jqueryui/jqueryui.d.ts"/>
/// <reference path="../typings/jquery.cookie/jquery.cookie.d.ts"/>

var dashboardControllers = angular.module('dashboardControllers', []);

declare var conf: any;

dashboardControllers.controller('TaskController', ['$scope', '$http',
    ($scope, $http): void => {

        let update: Function = () => {

            $http.get('tasks/users').success(function(data) {

                let userData: any = {};
                let userById: any = {};
                let taskById: any = {};

                for(let user of data.users) {
                    userById[user.id] = user.name;
                    userData[user.name] = {
                        user: user,
                        tasks: {}
                    }
                }

                for(let task of data.tasks) {
                    taskById[task.id] = task;
                }

                for(let userTask of data.userTasks) {
                    let task = taskById[userTask.taskId];
                    let user = userById[userTask.userId];
                    let status: string = task.status.toLowerCase();
                    let userItem: any = userData[user];
                    if (!userItem.tasks.hasOwnProperty(status)) {
                        userItem.tasks[status] = [];
                    }
                    userItem.tasks[status].push(task);
                }

                let container = $(".sortable");

                let getItems: Function = (): JQuery => {
                    return container.children('div');
                };

                let sortTasks: Function = (): void => {
                    let uOrder: number[] = $.cookie('uOrder') || [];
                    let items: JQuery = getItems();

                    items.sort((a: HTMLElement, b: HTMLElement) => {
                        let aId: number = +a.getAttribute('data-id'),
                            bId: number = +b.getAttribute('data-id');

                        let aIndex: number = uOrder.indexOf(aId);
                        let bIndex: number = uOrder.indexOf(bId);

                        if(aIndex > bIndex) {
                            return 1;
                        } else if(aIndex < bIndex) {
                            return -1;
                        }
                        return 0;
                    });


                    items.detach().appendTo(container);
                };

                let watch: Function = (condition: Function, callback: Function): void => {
                    let check: Function = (): void => {
                        console.log('check');
                        if (condition()) {
                            clearInterval(interval);
                            callback();
                        }
                    };
                    let interval: number = setInterval(check, 100);
                };

                let saveOrder: Function = (selection: JQuery, key: string): void => {
                    let order: number[] = [];
                    selection.each((index: number):void => {
                        order[index] = selection.eq(index).data('id');
                    });
                    $.cookie(key, order);
                };

                let onRender: Function = (): void => {
                    container.sortable({
                        handle: '.panel-heading',
                        update: () => {
                            saveOrder(getItems(), 'uOrder');
                        }
                    });
                    sortTasks();
                };

                watch((): boolean => {
                    return getItems().find('[data-id]').length == getItems.length;
                }, onRender);

                $scope.data = {
                    userData: userData,
                    unassignedTasks: data.unassignedTasks,
                    conf: conf
                };

            });

        };

        update();
        setInterval(update, 30000);
    }
]);