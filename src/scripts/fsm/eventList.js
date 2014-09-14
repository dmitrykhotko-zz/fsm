(function (global) {
    /**
     * @module fsm
     * @submodule fsm.classes
     */
    global.FSM = global.FSM || {};

    /**
     * @namespace FSM
     * @class EventList
     * @constructor
     * @param {Array} arguments
     */
    global.FSM.EventList = function () {
        var event,
            names = {},
            i,
            len;

        // validate params and init
        // --------------------------------------------------------------------

        if (arguments.length === 0) { throw "At least one event should be provided"; }

        for (i = 0, len = arguments.length; i < len; i++) {
            event = arguments[i];

            if (!(event instanceof global.FSM.Event)) { throw "All events should be instances of FSM.Event"; }
            if (names[event.name]) { throw "All events in event list should have unique names"; }

            this[event.name] = event;
            names[event.name] = true;
        }

        Object.defineProperty(this, 'length', { value: len });
    };

})(window);
