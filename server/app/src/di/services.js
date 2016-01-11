var Services = function () {

    return {

        framework: tl.Di.Container.share(function() {
            var Sequelize = require("sequelize");

            return tl.Framework.SequelizeFramework(new Sequelize(tl.Conf.Conf.connectString, {}), Sequelize);
        }),

        appService: tl.Di.Container.share(function() {
            //console.log(new tl.Service.AppService.AppService());
            return new tl.Service.AppService.AppService();
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

        importTasksService: tl.Di.Container.share(function() {
            return new tl.Service.ImportTasksService.ImportTasksService();
        }),

        taskService: tl.Di.Container.share(function() {
            return new tl.Service.TaskService.TaskService();
        }),

        jiraTasksService: tl.Di.Container.share(function() {
            return new tl.Service.JiraTasksService.JiraTasksService();
        }),

        entityConverterService: tl.Di.Container.share(function() {
            return new tl.Service.EntityConverterService.EntityConverterService();
        })
    }

};

module.exports = Services;
