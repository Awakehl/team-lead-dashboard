var AutoloadService = (function () {

    return {
        require: function(path) {

            var args = Array.prototype.slice.call(arguments);

            var pathLib = require("path");

            var _ = require("lodash");

            var exports = {};

            args.forEach(function(p) {
                var normalizedPath = pathLib
                    .join(__dirname + '../../../', p);

                var namespace = _.capitalize(
                    _.camelCase(
                        normalizedPath
                            .replace(/\/$/, '')
                            .split('/')
                            .pop()
                    )
                );

                exports[namespace] = {};



                require("fs").readdirSync(normalizedPath).forEach(function(file) {
                    exports[namespace][
                        _.capitalize(
                            _.camelCase(
                                file
                                    .replace('.js', '')
                            )
                        )] = require(normalizedPath + file);
                });
            });

            //console.log(exports);
            return exports;

        },

        expose: function(exports) {
            for (var i in exports) {
                global[i] = exports[i];
            }
        }

    }

})();

module.exports = AutoloadService;
