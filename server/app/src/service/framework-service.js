var FrameworkService = function () {

    var currentFrameworkInterface;
    if (null === currentFrameworkInterface) {
        if (DI.getService('framework') instanceof Sequelize) {
            currentFrameworkInterface = Di.Container.getService('SequelizeFramework');
        } else if (false/**/) {
            // implement your framework
        }
    }
    return {
        sync: function() {
            currentFrameworkInterface.sync(DI.getService('framework'))
        }
    }

};

module.exports = FrameworkService;

