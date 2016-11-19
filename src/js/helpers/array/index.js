import App from "app";

App.helpers.array = {};

/**
 * Sort an array of objects by one prop of objects
 * @param {Array} data
 * @param {String} prop
 * @param {String} direction defines if sort should be asc or desc
 */
App.helpers.array.sortByObjectKey = (data, prop, direction = "asc") => {
    if (["asc", "desc"].indexOf(direction) === -1) {
        throw new Error("Direction should be asc or desc");
    }

    return data.sort((a, b) => {
        let response = 0,
            ap = a[prop],
            bp = b[prop];

        if (ap < bp) {
            response = direction === "asc" ? -1 : 1;
        } else if (ap > bp) {
            response = direction === "asc" ? 1 : -1;
        }

        return response;
    });
};

/**
 * Filter objects from array that has key value in values
 * Example:
 * var a = [{a: 1}, {a: 2}, {a: 3}]
 * App.helpers.array.filterBy("a", [1, 3], a);
 *
 * The output will be:
 * [{a: 1}, {a: 3}]
 * @param key
 * @param values
 * @param items
 */
App.helpers.array.filterBy = (key, values, items) => {
    "use strict";

    return items.filter(item => values.indexOf(item[key]) > -1);
};
