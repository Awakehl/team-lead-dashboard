var Services = (function () {

    return {

        framework: function() {
            return new Sequelize();
        },

        frameworkService: function() {
            return new FrameworkService();
        }


    }

})();

//module.exports = {global[TLNamespace]Services;

module.exports = {service: {Services: Services}};
