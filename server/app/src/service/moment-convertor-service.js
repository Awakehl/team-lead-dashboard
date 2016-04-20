/// <reference path="../../../typings/moment/moment.d.ts"/>
var MomentConvertorService = (function () {
    function MomentConvertorService() {
    }
    MomentConvertorService.prototype.toMysqlDateTime = function (moment) {
        return moment.format('YYYY-MM-DD HH:mm:ss');
    };
    return MomentConvertorService;
})();
exports.MomentConvertorService = MomentConvertorService;
