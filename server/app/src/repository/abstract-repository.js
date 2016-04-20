/// <reference path="../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../typings/sequelize/sequelize.d.ts"/>
var Promise = require('bluebird');
var AbstractRepository = (function () {
    function AbstractRepository() {
    }
    AbstractRepository.prototype.createMany = function (dtos) {
        return this.getEntity().bulkCreate(dtos);
    };
    ;
    AbstractRepository.prototype.updateMany = function (dtos) {
        var entity = this.getEntity();
        return new Promise(function (resolve) {
            var dtosConsumable = dtos.concat();
            var consume = function () {
                if (dtosConsumable.length) {
                    var dto = dtosConsumable.shift();
                    entity.update(dto, {
                        where: {
                            id: dto.id
                        }
                    }).then(function () {
                        consume();
                    });
                }
                else {
                    resolve([]);
                }
            };
            consume();
        });
    };
    return AbstractRepository;
})();
exports.AbstractRepository = AbstractRepository;
