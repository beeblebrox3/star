var App = require("app");
var _ = require("lodash");

App.helpers.object = {};

/**
 * Get element from obj by string path
 * @param  {string} path
 * @param  {Object} obj reference object. If not provided or invalid, window will be used
 * @param {mixed} defaultValue value to return if key was not found. Default is null
 * @return {string|number|object|function|null}
 */
App.helpers.object.getFlattened = function (path, obj, defaultValue) {
    "use strict";

    if (typeof path !== "string") {
        throw "path must be string";
    }

    if (obj instanceof Object === false) {
        obj = window;
    }

    path = path.split(".");
    var i,
        size = path.length,
        response = obj,
        defaultValuetoReturn = defaultValue !== undefined ? defaultValue : null;

    for (i = 0; i < size; i += 1) {
        if (response instanceof Object === false) {
            return defaultValuetoReturn;
        }

        if (response.hasOwnProperty(path[i])) {
            response = response[path[i]];
        } else {
            return defaultValuetoReturn;
        }
    }

    return response;
};

App.helpers.object.setFlattened = function (path, newValue, obj) {
    "use strict";

    path = path.split(".");
    var i,
        laps = path.length - 1,
        temp = obj;

    for (i = 0; i < laps; i += 1) {
        temp = temp[path[i]];
    }

    temp[path[laps]] = newValue;
    return obj;
};

/**
 * Get first key of an object
 * @param obj
 * @returns {*}
 */
App.helpers.object.firstKey = function (obj) {
    "use strict";

    var i;

    if (obj instanceof Object === false) {
        throw "obj must be an Object";
    }

    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            return i;
        }
    }
};
