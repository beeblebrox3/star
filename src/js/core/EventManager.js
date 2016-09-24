class EventManager {
    constructor() {
        this._map = {};
    }

    subscribe(eventName, fn) {
        if (typeof eventName !== "string") {
            throw "eventName must be string";
        }

        if (!eventName.length) {
            throw "eventName cannot be empty";
        }

        if (!this._map.hasOwnProperty(eventName)) {
            this._map[eventName] = [];
        }

        this._map[eventName].push(fn);
    }

    subscribeMultiple(eventNames, fn) {
        let i, length = eventNames.length;

        for (i = 0; i < length; i++) {
            this.subscribe(eventNames[i], fn);
        }
    }

    unsubscribe(eventName, fn) {
        if (!this._map[eventName]) {
            return;
        }

        let index = this._map[eventName].indexOf(fn);
        if (index !== -1) {
            this._map[eventName].splice(index, 1);
        }
    }

    unsubscribeMultiple(eventNames, fn) {
        let i, length = eventNames.length;

        for (i = 0; i < length; i++) {
            this.unsubscribe(eventNames[i], fn);
        }
    }

    unsubscribeAll(eventNames) {
        let i, length = eventNames.length;
        for (i = 0; i < length; i++) {
            if (this._map.hasOwnProperty(eventNames[i])) {
                delete this._map(eventNames[i]);
            }
        }
    }

    notify(eventName) {
        console.log("fired " + eventName);

        if (!this._map.hasOwnProperty(eventName)) {
            console.log("nobody listening " + eventName);
            return;
        }

        let args = Array.prototype.slice.call(arguments, 1);
        this._map[eventName].forEach(function (fn) {
            fn.apply(this, args);
        });
    }
}

export default EventManager;
