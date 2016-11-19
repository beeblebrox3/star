import App from "app";

App.helpers.object = {};

/**
 * Get element from obj by string path
 * Example:
 * Given the object let a = {a: {b: 1}}
 * When you do getFlattened("a.b", a)
 * Then you get the number 1.
 * @param {string} path specify the key of the object you want
 * @param {Object} obj reference object
 * @param {any} defaultValue value to return if key was not found. Default is null
 * @return {any}
 */
App.helpers.object.getFlattened = (path, obj, defaultValue = null) => {
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
 * @see getFlattened
 * Similar to getFlattened, but it set the value instead of return it.
 * Example:
 * Given the object let b = {a: {b: 1}}
 * When you do setFlattened("a.b", 2)
 * Then you get {a: {b: 2}}
 * @param {String} path
 * @param {*} newValue
 * @param {Object} obj
 * @returns {*}
 */
App.helpers.object.setFlattened = (path, newValue, obj) => {
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
 * Get first key of an object or null if it doesn't have keys
 * @param {Object} obj
 * @returns {*}
 */
App.helpers.object.firstKey = (obj) => {
    "use strict";

    if (obj instanceof Object === false) {
        throw "obj must be an Object";
    }

    return Object.keys(obj)[0] || null;
};
