import App from "app";

App.helpers.string = {};

/**
 * Add basepath if isn't complete
 * Consider a complete url when it contains '//'
 *
 * Examples of complete urls:
 * http://google.com
 * https://google.com
 * //google.com
 *
 * Examples of incomplete urls:
 * google.com
 * google
 * users/create
 * /users/create
 *
 * @param {String} url
 * @param {String} basePath basepath to be used, with protocol. If not provided, will use the default basepath, from config
 * @returns {String}
 */
App.helpers.string.resolveUrl = function (url, basePath = App.Config.get("basepath")) {
    if (url.indexOf("//") === -1) {
        return basePath + url;
    }

    return url;
};

/**
 * Makes string capitalized
 * @param {String} string
 * @returns {string}
 */
App.helpers.string.ucfirst = function (string) {
    "use strict";

    string = string.toLocaleLowerCase();
    return string.charAt(0).toLocaleUpperCase() + string.substr(1);
};

/**
 * @see App.helpers.string.ucfirst
 */
App.helpers.string.capitalize = App.helpers.string.ucfirst;

/**
 * Makes every word from string capitalized
 * @param {String} string
 * @returns {string}
 */
App.helpers.string.ucwords = function (string) {
    "use strict";

    return string.split(" ").map(word => App.helpers.string.ucfirst(word)).join(" ");
};

/**
 * @param text
 * @param maxLength
 * @returns {*}
 */
App.helpers.string.excerpt = function (text, maxLength) {
    "use strict";

    if (maxLength !== parseInt(maxLength, 10) || maxLength < 1) {
        throw "maxLength must me an integer greater than 0";
    }

    if (typeof text !== "string") {
        throw "text must be string";
    }

    if (text.length > maxLength) {
        const exploded = text.split(" ");
        let counter = 0;
        let i = 0;
        let response = [];

        for (i = 0; i < exploded.length; i++) {
            if (counter + exploded[i].length <= maxLength || i === 0) {
                response.push(exploded[i]);
                counter += exploded[i].length;
            } else {
                break;
            }
        }

        text = response.join(" ") + "...";
    }

    return text;
};

/**
 * generares a UUID
 * Ref: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {String}
 */
App.helpers.string.uuid = function () {
    "use strict";

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === "x" ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
