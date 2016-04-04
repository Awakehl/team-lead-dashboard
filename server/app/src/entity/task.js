var Task = (function () {
    function Task() {
        return app.getFramework().define('task', {
            key: app.getFramework().definition.STRING,
            assignee: app.getFramework().definition.STRING,
            estimation: app.getFramework().definition.DOUBLE,
            summary: app.getFramework().definition.STRING,
            status: app.getFramework().definition.STRING,
            epic_key: app.getFramework().definition.STRING
        });
    }
    return Task;
})();
exports.Task = Task;
