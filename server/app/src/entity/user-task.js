var UserTask = (function () {
    function UserTask() {
        return app.getFramework().define('userTask', {
            user_id: {
                type: app.getFramework().definition.INTEGER,
                references: {
                    model: app.getEntity('User')
                }
            },
            task_id: {
                type: app.getFramework().definition.INTEGER,
                references: {
                    model: app.getEntity('Task')
                }
            },
            start_time: {
                type: app.getFramework().definition.DATE
            },
            end_time: {
                type: app.getFramework().definition.DATE
            }
        });
    }
    return UserTask;
})();
exports.UserTask = UserTask;
