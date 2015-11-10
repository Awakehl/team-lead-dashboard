var UserTask = (function () {

    return Connection.seq.define('userTask', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: User
            }
        },

       task_id: {
           type: Sequelize.INTEGER,
           references: {
               model: Task
           }
        },

        startTime: Sequelize.DATETIME,
        endTime: Sequelize.DATETIME
    });

})();

module.exports = UserTask;
