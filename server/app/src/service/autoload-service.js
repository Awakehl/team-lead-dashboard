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
                    if (file.indexOf('.js') !== -1) {
                        exports[namespace][
                            _.capitalize(
                                _.camelCase(
                                    file
                                        .replace('.js', '')
                                )
                            )] = require(normalizedPath + file);
                    }
                });
            });

            return exports;

        },

        expose: function(exports, to) {
            for (var i in exports) {
                to[i] = exports[i];
            }
        }

    }

})();

module.exports = AutoloadService;
