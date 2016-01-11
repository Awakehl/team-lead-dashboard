var Entities = function () {

    var returnObj = {};
    for (var entity in tl.Entity) {
        (function(e) {
            returnObj[e] = tl.Di.Container.share(function () {
                var tmp =  tl.Entity[e][e];
                return tmp();
            })
        })(entity)
    }

    return returnObj

};

module.exports = Entities;
