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

        /**
         * @param {string} name
         * @return {Model}
         */
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

            console.log('Get repo: '+name);
            if (!tl.Repository.hasOwnProperty(name)) {
                console.log(name, '->', tl.Repository[name]);
                console.error('Available repositories:', tl.Repository);
            }

            return (share(function() {
                var r = new tl.Repository[name][name]();
                //console.log('res->', r);
                return r;
            }))();
        },
        getService: function(name) {
            name = _.camelCase(name);
            if (!services().hasOwnProperty(name)) {
                console.error('Service ' + name + ' is not defined');
            }
           // console.log(name, services()[name]);
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
