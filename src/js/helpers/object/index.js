import App from "app";

App.helpers.object = {};

/**
 * Get element from obj by string path
 * @param {string} path
 * @param {Object} obj reference object
 * @param {*} defaultValue value to return if key was not found. Default is null
 * @return {string|number|object|function|null}
 */
App.helpers.object.getFlattened = function (path, obj, defaultValue = null) {
    if (typeof path !== "string") {
        throw "path must be string";
    }

    let i;
    let response = obj;
    const size = path.split(".").length;

    for (i = 0; i < size; i += 1) {
        if (response instanceof Object === false) {
            return defaultValue;
        }

        if (response.hasOwnProperty(path[i])) {
            response = response[path[i]];
        } else {
            return defaultValue;
        }
    }

    return response;
};

/**
 * @param {String} path
 * @param {*} newValue
 * @param {Object} obj
 * @returns {*}
 */
App.helpers.object.setFlattened = function (path, newValue, obj) {
    "use strict";

    const laps = path.split(".").length;
    let i;
    let temp = obj;

    for (i = 0; i < laps; i += 1) {
        temp = temp[path[i]];
    }

    temp[path[laps]] = newValue;
    return obj;
};

/**
 * Get first key of an object
 * @param {Object} obj
 * @returns {*}
 */
App.helpers.object.firstKey = function (obj) {
    "use strict";

    let i;

    if (obj instanceof Object === false) {
        throw "obj must be an Object";
    }

    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            return i;
        }
    }
};
