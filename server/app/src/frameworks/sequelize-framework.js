var SequelizeFramework = function() {

    var o = Object.create(Di.Container.getService('FrameworkInterface'));
    o.prototype.sync = function(framework) {
        framework.sync();
    };

    return o;
};

module.exports = SequelizeFramework;