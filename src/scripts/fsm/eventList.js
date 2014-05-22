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
            i,
            len;

        // validate params and init
        // --------------------------------------------------------------------

        if (arguments.length === 0) { throw "At least one FSM.Event should be provided"; }

        for (i = 0, len = arguments.length; i < len; i++) {
            event = arguments[i];

            if (!(event instanceof global.FSM.Event)) { throw "All arguments should be instances of FSM.Event"; }

            this[arguments[i].name] = arguments[i];
        }

        this.length = arguments.length;
    };

})(window);
