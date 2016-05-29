var App = require("app");

App.helpers.array = {};

/**
 * Sort an array of objects by one prop of objects
 * @param {Array} data
 * @param {String} prop
 */

App.helpers.array.sortByObjectKey = function (data, prop) {
    "use strict";

    return data.sort(function (a, b) {
        var response = 0,
            ap = a[prop],
            bp = b[prop];

        if (ap < bp) {
            response = -1;
        } else if (ap > bp) {
            response = 1;
        }

        return response;
    });
};

App.helpers.array.filterBy = function (key, values, items) {
    "use strict";

    return items.filter(function (item) {
        return values.indexOf(item[key]) > -1;
    });
};
