var UserTask = function () {

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

        startTime: app.getFramework().definition.DATE,
        endTime: app.getFramework().definition.DATE
    });

};

module.exports = UserTask;
