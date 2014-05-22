(function (global) {
    var State;

    /**
     * @module fsm
     * @submodule fsm.classes
     */
    global.FSM = global.FSM || {};

    /**
     * @namespace FSM
     * @class State
     * @constructor
     * @param {String} name
     * @param {Object} events
     * @param {Function} action
     */
    State = global.FSM.State = function (name, events, action) {
        var key,
            i = 0;

        // validate params
        // --------------------------------------------------------------------

        if (!name || !events) {
            throw "'name' and 'events' should be defined";
        } else {
            for (key in events) {
                i++;

                if (!(events[key] instanceof global.FSM.Event)) {
                    throw "All items in 'events' should be instances of Event";
                }
            }

            if (i === 0) { throw "At least one event should be defined"; }
        }

        action = action || function () {};

        // --------------------------------------------------------------------

        this.name = name;
        this.events = events;
        this.action = action;
    };

})(window);
