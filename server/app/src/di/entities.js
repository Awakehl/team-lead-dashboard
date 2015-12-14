var Entities = function () {

    var returnObj = {};
    for (var entity in tl.Entity) {
        (function(e) {
            returnObj[e] = tl.Di.Container.share(function () {
                return tl.Entity[e]();
            })
        })(entity)
    }

    return returnObj

};

module.exports = Entities;
