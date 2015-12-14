function UserDTO() {
    this.name = null;
}

var User = function () {

    return app.getFramework().define('user', {
        name: app.getFramework().definition.STRING
    });

};

module.exports = User;

