module.exports = function () {

    return {

        findByNames: function(names) {
            return app.getEntity('User')
                .findAll();
        }

    }

};
