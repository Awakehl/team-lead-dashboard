/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
var Promise = require('bluebird');
var UserRepository = (function () {
    function UserRepository() {
    }
    UserRepository.prototype.findAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getEntity().findAll().then(function (dbUsers) {
                var users = [];
                for (var _i = 0; _i < dbUsers.length; _i++) {
                    var dbUser = dbUsers[_i];
                    users.push(app.getEntityConverterService().toUserDTO(dbUser));
                }
                resolve(users);
            });
        });
    };
    UserRepository.prototype.createMany = function (dtos) {
        return this.getEntity().bulkCreate(dtos);
    };
    ;
    UserRepository.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getEntity().findAll().then(function (dbUsers) {
                var result = [];
                for (var _i = 0; _i < dbUsers.length; _i++) {
                    var dbUser = dbUsers[_i];
                    result.push(app.getEntityConverterService().toUserDTO(dbUser));
                }
                resolve(result);
            });
        });
    };
    UserRepository.prototype.getEntity = function () {
        return app.getEntity('User');
    };
    return UserRepository;
})();
exports.UserRepository = UserRepository;
