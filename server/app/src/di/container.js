/**
 * Module: DI
 * Author: semen.tanianskii
 */
var Container = (function () {

    var _ = require("lodash");

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
        return tl.Di.Services();
    });

    var entities = share(function() {
        return tl.Di.Entities();
    });

    var interface = {

        getEntity: function(name) {
            if (!entities().hasOwnProperty(name)) {
                console.error('Entity ' + name + ' is not defined');
            }
            return entities()[name]();
        },
        getDTO: function(name) {
            return tl.Dto[name + 'Dto'];
        },
        getRepository: function(name) {
            return (share(function() {
                return tl.Repository[name+'Repository']();
            }))();
        },
        getService: function(name) {
            name = _.camelCase(name);
            if (!services().hasOwnProperty(name)) {
                console.error('Service ' + name + ' is not defined');
            }
            return services()[name]();
        },
        getFramework: function() {
            return interface.getService('framework');
        },
        share: share
    };

    return interface;

})();

module.exports = Container;
