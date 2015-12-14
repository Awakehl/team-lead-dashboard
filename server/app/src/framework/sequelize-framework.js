var SequelizeFramework = function(framework, definition) {

    var o = tl.Framework.FrameworkInterface();

    o.definition = definition;

    o.sync = function() {
        return framework.sync();
    };

    o.define = function() {
        return framework.define(arguments[0], arguments[1]);
    };

    return o;
};

module.exports = SequelizeFramework