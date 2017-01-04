var EventManager = function () {
    "use strict";

    var map = {};
    return {
        assign: function (event, fn) {
            if (!map.hasOwnProperty(event)) {
                map[event] = [];
            }
            map[event].push(fn);
            return this.unassign.bind(this, event, fn);
        },
        subscribe: function (events, fn) {
            events = Array.isArray(events) ? events : [events];
            var self = this;
            var unsubscriptions = events.map(function (ev) {
                return self.assign(ev, fn);
            });
            return this.unsubscribe.bind(this, unsubscriptions);
        },
        unassign: function (event, fn) {
            let index = map[event].indexOf(fn);
            if (index > -1) {
                map[event].splice(index, 1);
            }
        },
        unsubscribe: function (unsubscriptions) {
            unsubscriptions.map(function (unassign) {
                unassign();
            });
        },
        notify: function (event) {
            console.log("fired " + event);
            if (!map.hasOwnProperty(event) || map[event].length === 0) {
                console.log("Nobody listening " + event);
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            map[event].map(function (fn) {
                fn.apply(this, args);
            });
        }
    };
};

module.exports = EventManager;
