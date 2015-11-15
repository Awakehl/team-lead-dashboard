var UserCalendar = function () {

    return Di.Container.getFramework().define('userCalendar', {
        // It is possible to create foreign keys:
        user_id: {
            type: Sequelize.INTEGER,

            references: {
                // This is a reference to another model
                model: User,

                // This is the column name of the referenced model
                key: 'id'
            }
        },

        date: Sequelize.DATE,
        startTime: Sequelize.DATETIME,
        endTime: Sequelize.DATETIME,
        standUp: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });

};

module.exports = UserCalendar;
