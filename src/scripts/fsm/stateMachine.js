(function (global) {
    var StateMachine;

    /**
     * @module fsm
     * @submodule fsm.classes
     */
    global.FSM = global.FSM || {};

    /**
     * @namespace FSM
     * @class StateMachine
     * @constructor
     * @param {Object} settings
     */
    StateMachine = global.FSM.StateMachine = function (settings) {
        var key,
            i,
            len;

        // validate params
        // --------------------------------------------------------------------

        if (settings.states && settings.states.length > 0 && settings.initialState) {
            if (!(settings.initialState instanceof global.FSM.State)) {
                throw "'initialState' should be instance of FSM.State";
            }

            for (i = 0, len = settings.states.length; i < len; i++) {
                if (!(settings.states[i] instanceof global.FSM.State)) {
                    throw "All items in 'states' should be instances of FSM.State";
                }
            }
        } else {
            throw "'states' and 'initialState' should be defined";
        }

        settings.logLevel = settings.logLevel || 0;
        settings.logger = settings.logger || (settings.logLevel > 0 ? console.log.bind(console) : null);

        // --------------------------------------------------------------------

        // save settings
        // --------------------------------------------------------------------

        for (key in settings) { this["_" + key] = settings[key]; }

        // create indexes
        // --------------------------------------------------------------------

        this._indexes = {};

        for (i = 0, len = this._states.length; i < len; i++) {
            this._indexes[this._states[i].name] = i;
        }

        // --------------------------------------------------------------------

        this.reset();
    };

    // public methods
    // --------------------------------------------------------------------

    /**
     * @method consumeEvent
     */
    StateMachine.prototype.consumeEvent = function (eventName, eventArgs) {
        var nextState,
            event = this._currentState.events[eventName],
            stopPropagation;

        this._log("consumeEvent | current state: '" + this._currentState.name + "', event name: '" + eventName + "'");

        if (!event) {
            this._log("consumeEvent | no '" + eventName + "' in '" + this._currentState.name + "' events");
            return this.getCurrentState();
        }

        stopPropagation = !!event.action(eventArgs);

        if (stopPropagation) {
            this._log("consumeEvent | propagation was cancelled. state was not changed");
            return null;
        }

        nextState = this._states[this._indexes[event.nextState()]];

        return this._changeState(nextState, event);
    };

    /**
     * @method getCurrentState
     */
    StateMachine.prototype.getCurrentState = function () {
        var events = [],
            key;

        for (key in this._currentState.events) { events.push(key); }

        return {
            name: this._currentState.name,
            events: events
        };
    };

    /**
     * @method reset
     */
    StateMachine.prototype.reset = function () {
        this._currentState = this._initialState;

        this._callIfExist(this.onReset);
        this._currentState.action();
    };

    // --------------------------------------------------------------------

    // private methods
    // --------------------------------------------------------------------

    /**
     * @method _log
     * @private
     */
    StateMachine.prototype._log = function (message) {
        if (!this._logger) { return; }

        this._logger("[FSM | " + (new Date()).toLocaleTimeString() + "] :: " + message);
    };

    /**
     * @method _changeState
     * @private
     */
    StateMachine.prototype._changeState = function (nextState, event) {
        var result,
            prevState = this.getCurrentState();

        this._currentState = nextState;
        result = this.getCurrentState();

        this._callIfExist(this.onStateChanged, result);
        this._currentState.action(prevState);

        return result;
    };

    /**
     * @method _callIfExist
     * @private
     */
    StateMachine.prototype._callIfExist = function (method, args) {
        if (method) { return method(args); }
    };

    // --------------------------------------------------------------------

})(window);
