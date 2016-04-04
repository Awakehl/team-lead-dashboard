var User = (function () {
    function User() {
        return app.getFramework().define('user', {
            name: app.getFramework().definition.STRING
        });
    }
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map