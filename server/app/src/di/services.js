var Services = function () {

    return {

        framework: tl.Di.Container.share(function() {
            return new Sequelize();
        }),

        frameworkService: tl.Di.Container.share(function() {
            return new tl.Service.FrameworkService();
        }),

        appService: tl.Di.Container.share(function() {
            return new tl.Service.AppService();
        })
    }

};

//module.exports = {global[TLNamespace]Services;

module.exports = Services;
