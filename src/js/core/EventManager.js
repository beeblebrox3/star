/**
 * Utility class to handle with events (subscribe, notify etc)
 *
 * @class EventManager
 */
class EventManager {
    constructor() {
        this._map = {};
    }

    /**
     * Add an event listener
     *
     * @param {String} eventName Event's name
     * @param {Function} fn Handler
     * @returns {Function} the "unsubscriber". Call this function to unsubscribe this event (or use the unsubscribe method)
     *
     * @memberOf EventManager
     */
    subscribe(eventName, fn) {
        if (typeof eventName !== "string") {
            throw "eventName must be string";
        }

        if (!eventName.length) {
            throw "eventName cannot be empty";
        }

        console.log(this);

        if (!this._map.hasOwnProperty(eventName)) {
            this._map[eventName] = [];
        }

        this._map[eventName].push(fn);
        return this.unsubscribe.bind(this, eventName, fn);
    }

    /**
     * @see subscribe
     * Add an event listener to multiple event aht the sabe time
     *
     * @param {String[]} eventNames Event's names
     * @param {any} fn Handler
     * @return {Function[]} Unsubscribers for all events
     * @see EventManager.subscribe
     *
     * @memberOf EventManager
     */
    subscribeMultiple(eventNames, fn) {
        let i, length = eventNames.length;

        var unsubscribes = [];
        for (i = 0; i < length; i++) {
            unsubscribes.push(this.subscribe(eventNames[i], fn));
        }

        return () => {
            unsubscribes.map(unsubscribe => unsubscribe());
        }
    }

    /**
     * Removes an event listener from an event
     *
     * @param {string} eventName Event's name
     * @param {Function} fn Handler to remove
     *
     * @memberOf EventManager
     */
    unsubscribe(eventName, fn) {
        if (!this._map[eventName]) {
            return;
        }

        let index = this._map[eventName].indexOf(fn);
        if (index !== -1) {
            this._map[eventName].splice(index, 1);
        }
    }

    /**
     * @see unsubscribe
     * Removes the event listener from multiple events
     *
     * @param {String[]} eventNames Event's names
     * @param {Function} fn
     *
     * @memberOf EventManager
     */
    unsubscribeMultiple(eventNames, fn) {
        let i, length = eventNames.length;

        for (i = 0; i < length; i++) {
            this.unsubscribe(eventNames[i], fn);
        }
    }

    /**
     * Removes all event listeners from the given events
     *
     * @param {String[]} eventNames
     *
     * @memberOf EventManager
     */
    unsubscribeAll(eventNames) {
        let i, length = eventNames.length;
        for (i = 0; i < length; i++) {
            if (this._map.hasOwnProperty(eventNames[i])) {
                delete this._map(eventNames[i]);
            }
        }
    }

    /**
     * Trigger an event. Will send all arguments after eventName to the existent
     * event listeners
     *
     * @param {String} eventName Event's name
     *
     * @memberOf EventManager
     */
    notify(eventName) {
        console.log(eventName);
        if (!this._map.hasOwnProperty(eventName)) {
            return;
        }

        // make an copy of the arguments to prevent someone to change it
        let args = Array.prototype.slice.call(arguments, 1);
        this._map[eventName].forEach(function (fn) {
            fn.apply(this, args);
        });
    }
}

export default EventManager;
