/**
 * Module: DI
 * Author: semen.tanianskii
 */
var Container = (function () {

    /*var YAML = require('yamljs');

    var conf = YAML.load('di.yml');

    var getOverride = function(name) {
        return conf[name] ? global[name] : null;
    };

    var getDefinition = function() {

    };*/

    var di = this;

    return {
        getModel: function(name) {
            //return getOverride('entity.' + name) || entity[name];
        },
        getRepository: function(name) {
            //return getOverride('repository.' + name) ||repository[name];
        },
        getService: function(name) {
            return Services[name]();
        },
        getFramework: function() {
            return di.getService('frameworkService');
        },
        share: function(callable) {
            var object;
            return function() {
                if (null === object) {
                    object = callable(di);
                }
                return object;
            }
        }
    };

})();

module.exports = Container;
