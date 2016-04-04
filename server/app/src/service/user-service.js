var user_dto_1 = require("../dto/user-dto");
var Promise = require('bluebird');
var UserService = (function () {
    function UserService(repository, userCalendarService) {
        this.repository = repository;
        this.userCalendarService = userCalendarService;
    }
    UserService.prototype.importUsersFromTasks = function (tasks) {
        var _this = this;
        return new Promise(function (resolve) {
            var existing = {};
            var user;
            var insert = [];
            var task;
            _this.repository.getAll().then(function (users) {
                for (var _i = 0; _i < users.length; _i++) {
                    user = users[_i];
                    existing[user.name] = user;
                }
                for (var _a = 0; _a < tasks.length; _a++) {
                    task = tasks[_a];
                    if (task.assignee && !existing.hasOwnProperty(task.assignee)) {
                        var dto = new user_dto_1.UserDTO(null, task.assignee);
                        insert.push(dto);
                        existing[task.assignee] = dto;
                    }
                }
                if (insert.length) {
                    _this.repository.createMany(insert).then(function () {
                        for (var _i = 0; _i < insert.length; _i++) {
                            user = insert[_i];
                            _this.userCalendarService.initUserCalendar(user.id);
                        }
                        resolve(tasks);
                    });
                }
                else {
                    resolve(tasks);
                }
            });
        });
    };
    UserService.prototype.getByIds = function (userIds) {
        return this.repository.getByIds(userIds);
    };
    UserService.prototype.getAll = function () {
        return this.repository.getAll();
    };
    return UserService;
})();
exports.UserService = UserService;
