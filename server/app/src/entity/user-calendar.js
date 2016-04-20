var UserCalendar = (function () {
    function UserCalendar() {
        return app.getFramework().define('userCalendar', {
            user_id: {
                type: app.getFramework().definition.INTEGER,
                references: {
                    model: app.getEntity('User'),
                    key: 'id'
                }
            },
            date: app.getFramework().definition.DATE,
            start_time: app.getFramework().definition.DATE,
            end_time: app.getFramework().definition.DATE
        });
    }
    return UserCalendar;
})();
exports.UserCalendar = UserCalendar;
