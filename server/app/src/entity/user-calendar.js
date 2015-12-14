var UserCalendar = function () {

    return app.getFramework().define('userCalendar', {

        name: app.getFramework().definition.STRING,

        // It is possible to create foreign keys:
        user_id: {
            type: app.getFramework().definition.INTEGER,

            references: {
                // This is a reference to another model
                model: app.getEntity('User'),

                // This is the column name of the referenced model
                key: 'id'
            }
        },

        date: app.getFramework().definition.DATE,
        startTime: app.getFramework().definition.DATE,
        endTime: app.getFramework().definition.DATE,
        standUp: { type: app.getFramework().definition.BOOLEAN, allowNull: false, defaultValue: true }
    });

};

module.exports = UserCalendar;
