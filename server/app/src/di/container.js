/**
 * Module: DI
 * Author: semen.tanianskii
 */
var Container = (function () {

    var share = function(callable) {
        var object = null;
        return function() {
            if (null === object) {
                object = callable();
            }
            return object;
        }
    };

    var services = share(function() {
        return new tl.Di.Services();
    });

    var interface = {
        getEntity: function(name) {
            //return getOverride('entity.' + name) || entity[name];
        },
        getRepository: function(name) {
            //return getOverride('repository.' + name) ||repository[name];
        },
        getService: function(name) {
            return services()[name]();
        },
        getFramework: function() {
            return interface.getService('frameworkService');
        },
        share: share
    };

    return interface;

})();

module.exports = Container;
