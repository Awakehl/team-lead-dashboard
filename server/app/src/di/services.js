var Services = function () {

    return {

        framework: tl.Di.Container.share(function() {
            var Sequelize = require("sequelize");

            return tl.Framework.SequelizeFramework(new Sequelize(tl.Conf.Conf.connectString, {}), Sequelize);
        }),

        appService: tl.Di.Container.share(function() {
            return new tl.Service.AppService();
        }),

        dateService: tl.Di.Container.share(function() {
            return new tl.Service.DateService();
        }),

        updateTasksService: tl.Di.Container.share(function() {
            return new tl.Service.UpdateTasksService();
        }),

        updateTasksDispatcherService: tl.Di.Container.share(function() {
            return new tl.Service.UpdateTasksDispatcherService();
        }),

        eventsService: tl.Di.Container.share(function() {
            return new tl.Service.EventsService();
        }),

        importService: tl.Di.Container.share(function() {
            return new tl.Service.ImportService();
        }),

        tasksService: tl.Di.Container.share(function() {
            return new tl.Service.TasksService();
        })
    }

};

module.exports = Services;
