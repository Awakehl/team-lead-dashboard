var Task = (function () {
    function Task() {
        return app.getFramework().define('task', {
            key: app.getFramework().definition.STRING,
            summary: app.getFramework().definition.STRING,
            estimation: app.getFramework().definition.DOUBLE,
            status: app.getFramework().definition.INTEGER
        });
    }
    return Task;
})();
exports.Task = Task;
