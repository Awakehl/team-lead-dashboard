var Task = (function () {

    return Connection.seq.define('task', {
        name: Sequelize.STRING,
        summary: Sequelize.STRING,
        estimation: Sequelize.DOUBLE,
        status: Sequelize.INTEGER
    });

})();

module.exports = {entity: {task: Task}};
