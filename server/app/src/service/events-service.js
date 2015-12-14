function EventsService() {

    /**
     * @param {object} data
     * @returns {Event}
     */
    this.createEvent = function (data) {
        var events = require("event-dispatcher");

        return new events.Event(data);
    }
}

module.exports = EventsService;