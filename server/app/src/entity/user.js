var User = function () {

    return Di.Container.getFramework().define('user', {
        name: Sequelize.STRING
    });

};

module.exports = User;
