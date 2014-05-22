(function (global) {
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
    global.FSM.Event = function (name, nextState, action) {
        // validate params
        // --------------------------------------------------------------------

        if (!name) { throw "'name' should be defined"; }
        if (!nextState) { throw "'nextState' should be defined"; }
        if (!(typeof nextState === "string" || nextState instanceof Function)) { throw "'nextState' should be a 'string' or 'function'"; }

        // --------------------------------------------------------------------

        this.name = name;
        this.nextState = nextState instanceof Function ? nextState : function () { return nextState; };
        this.action = action || function () {};
    };

})(window);
