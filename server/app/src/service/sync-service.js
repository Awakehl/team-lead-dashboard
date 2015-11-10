var SyncService = (function () {

    return {
        sync: function() {
            sequelize.sync()
        }

    }

})();

module.exports = {service: {SyncService: SyncService}};
