(function (global) {
    var Event;

    /**
     * @module fsm
     * @submodule fsm.classes
     */
    global.FSM = global.FSM || {};

    /**
     * @namespace FSM
     * @class Event
     * @constructor
     * @param {State} nextState
     * @param {Function} action
     */
    Event = global.FSM.Event = function (nextState, action) {
        // validate params
        // --------------------------------------------------------------------

        if (!nextState) { throw "'nextState' should be defined"; }
        if (!(typeof nextState === "string" || nextState instanceof Function)) { throw "'nextState' should be a 'string' or 'function'"; }

        // --------------------------------------------------------------------

        this.nextState = nextState instanceof Function ? nextState : function () { return nextState; };
        this.action = action || function () {};
    };

})(window);
