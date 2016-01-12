var Services = function () {

    var share1 = function(callable) {
        var object = null;
        return function() {
            if (null === object) {
                object = callable();
            }
            return object;
        }
    };

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
            return new tl.Service.ImportTasksService.ImportTasksService(app.getJiraTasksService(), app.getTaskService(), app.getUserService());
        }),

        taskService: share1(function() {
            var r = tl.Service.TaskService.TaskService;
            var rr = new r(app.getTaskRepository());
            return rr;
        }),

        jiraTasksService: tl.Di.Container.share(function() {
            return new tl.Service.JiraTasksService.JiraTasksService();
        }),

        userService: tl.Di.Container.share(function() {
            var r = app.getUserRepository();
            return new tl.Service.UserService.UserService(app.getUserRepository());
        }),

        entityConverterService: tl.Di.Container.share(function() {
            return new tl.Service.EntityConverterService.EntityConverterService();
        })
    }

};

module.exports = Services;
