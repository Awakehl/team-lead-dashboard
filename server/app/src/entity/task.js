var Task = function () {

    return app.getFramework().define('task', {
        name: app.getFramework().definition.STRING,
        summary: app.getFramework().definition.STRING,
        estimation: app.getFramework().definition.DOUBLE,
        status: app.getFramework().definition.INTEGER
    });

};

module.exports = Task;
