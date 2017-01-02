function EventManager() {
    this.map = {};
};

EventManager.prototype.findIndexById = function (list, value) {
    "use strict";
    for (var i = 0, len = list.length; i < len; i += 1) {
        if (list[i]["id"] == value) {
            return +i;
        }
    }
    return null;
};

EventManager.prototype.assign = function (event, fn) {
    "use strict";
    if (typeof event !== "string") {
        throw "The event name must be string";
    }

    if (!event.length) {
        throw "The event name cannot be empty";
    }

    if (!this.map.hasOwnProperty(event)) {
        this.map[event] = [];
    }
    var id = 0;
    if (this.map[event].length > 0) {
        id = this.map[event][this.map[event].length - 1].id + 1;
    }
    this.map[event].push({
        id: id,
        fn: fn
    });
    return id;
};

EventManager.prototype.subscribe = function (events, fn) {
    "use strict";
    var unsubs = {};
    var id = null;
    if (Array.isArray(events)) {
        for (var i = 0, len = events.length; i < len; i += 1) {
            id = this.assign(events[i], fn);
            if (unsubs[events[i]] === undefined) {
                unsubs[events[i]] = [];
            }
            unsubs[events[i]].push(id);
        }
    } else {
        id = this.assign(events, fn);
        if (unsubs[events] === undefined) {
            unsubs[events] = [];
        }
        unsubs[events].push(id);
    }
    return this.unsubscribe.bind(this, unsubs);
};

EventManager.prototype.unsubscribe = function (events) {
    "use strict";
    var index = null;
    for (var ev in events) {
        for (var i = 0, len = events[ev].length; i < len; i += 1) {
            index = this.findIndexById(this.map[ev], events[ev][i]);
            if (index !== null) {
                this.map[ev].splice(index, 1);
            }
        }
    }
};

EventManager.prototype.notify = function (event) {
    "use strict";
    console.log("fired " + event);

    if (!this.map.hasOwnProperty(event) || this.map[event].length === 0) {
        console.log("Nobody listening " + event);
        return;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    this.map[event].forEach(function (sub) {
        sub.fn.apply(this, args);
    });
};

module.exports = EventManager;
