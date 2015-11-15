var AppService = function () {

    return {
        getService: tl.Di.Container.getService,
        getEntity: tl.Di.Container.getEntity,
        getRepository: tl.Di.Container.getRepository,
        share: tl.Di.Container.share
    }

};

module.exports = AppService;

