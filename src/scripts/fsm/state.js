(function (global) {
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
     * @param {Array} events
     * @param {Function} action
     */
    global.FSM.State = function (name, events, action) {
        // validate params
        // --------------------------------------------------------------------

        if (!name || !events) { throw "'name' and 'events' should be defined"; }
        if (!(events instanceof global.FSM.EventList)) { throw "'events' should be instance of FSM.EventList"; }

        action = action || function () {};

        // --------------------------------------------------------------------

        this.name = name;
        this.events = events;
        this.action = action;
    };

})(window);
