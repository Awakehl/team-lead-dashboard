var User = (function () {

    return Connection.seq.define('user', {
        name: Sequelize.STRING
    });

})();

module.exports = User;
