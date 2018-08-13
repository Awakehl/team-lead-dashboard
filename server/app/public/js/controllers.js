/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/jqueryui/jqueryui.d.ts"/>
/// <reference path="../typings/jquery.cookie/jquery.cookie.d.ts"/>
var dashboardControllers = angular.module('dashboardControllers', []);
dashboardControllers.controller('TaskController', function ($scope, $http, $routeParams) {
    var update = function () {
        var epics = $routeParams.epics || '';
        var users = $routeParams.users || '';
        $http.get('tasks/users?epics=' + epics + '&users=' + users).success(function (data) {
            var userData = {};
            var userById = {};
            var taskById = {};
            for (var _i = 0, _a = data.users; _i < _a.length; _i++) {
                var user = _a[_i];
                userById[user.id] = user.name;
                userData[user.name] = {
                    user: user,
                    displayName: user.displayName ? user.displayName : user.name,
                    tasks: {}
                };
            }
            for (var _b = 0, _c = data.tasks; _b < _c.length; _b++) {
                var task = _c[_b];
                taskById[task.id] = task;
            }
            for (var _d = 0, _e = data.userTasksSummary; _d < _e.length; _d++) {
                var userTaskSummary = _e[_d];
                var task = taskById[userTaskSummary.taskId];
                task.user = userData[task.assignee];
                var user = userById[userTaskSummary.userId];
                var status_1 = task.status.toLowerCase();
                var userItem = userData[user];
                if (!userItem.tasks.hasOwnProperty(status_1)) {
                    userItem.tasks[status_1] = [];
                }
                task.spentTime = userTaskSummary.spentTime;
                userItem.tasks[status_1].push(task);
            }
            var container = $(".sortable");
            var getItems = function () {
                return container.children('div');
            };
            var sortTasks = function () {
                var uOrder = $.cookie('uOrder') || [];
                var items = getItems();
                items.sort(function (a, b) {
                    var aId = +a.getAttribute('data-id'), bId = +b.getAttribute('data-id');
                    var aIndex = uOrder.indexOf(aId);
                    var bIndex = uOrder.indexOf(bId);
                    if (aIndex > bIndex) {
                        return 1;
                    }
                    else if (aIndex < bIndex) {
                        return -1;
                    }
                    return 0;
                });
                items.detach().appendTo(container);
            };
            var watch = function (condition, callback) {
                var check = function () {
                    console.log('check');
                    if (condition()) {
                        clearInterval(interval);
                        callback();
                    }
                };
                var interval = setInterval(check, 100);
            };
            var saveOrder = function (selection, key) {
                var order = [];
                selection.each(function (index) {
                    order[index] = selection.eq(index).data('id');
                });
                $.cookie(key, order, { expiry: 0, domain: '', path: '' });
            };
            var onRender = function () {
                container.sortable({
                    handle: '.panel-heading',
                    update: function () {
                        saveOrder(getItems(), 'uOrder');
                    }
                });
                sortTasks();
            };
            watch(function () {
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
});
//# sourceMappingURL=controllers.js.map