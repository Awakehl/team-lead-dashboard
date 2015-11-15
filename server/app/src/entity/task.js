var Task = function () {

    return Di.Container.getFramework().define('task', {
        name: Sequelize.STRING,
        summary: Sequelize.STRING,
        estimation: Sequelize.DOUBLE,
        status: Sequelize.INTEGER
    });

};

module.exports = Task;
