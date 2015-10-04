var App = require("app");

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
 *
 * @param url
 * @returns {*}
 */
App.helpers.string.resolveUrl = function (url) {
    "use strict";

    if (url.indexOf("//") === -1) {
        return App.Config.get("basepath") + url;
    }

    return url;
};

App.helpers.string.ucfirst = function (string) {
    "use strict";

    string = string.toLocaleLowerCase();
    return string.charAt(0).toLocaleUpperCase() + string.substr(1);
};

App.helpers.string.ucwords = function (string) {
    "use strict";

    string = string.split(" ").map(function (word) {
        return App.helpers.string.ucfirst(word);
    });

    return string.join(" ");
};

App.helpers.string.excerpt = function (text, maxLength) {
    "use strict";

    if (maxLength !== parseInt(maxLength, 10) || maxLength < 1) {
        throw "maxLength must me an integer greater than 0";
    }

    if (typeof text !== "string") {
        throw "text must be string";
    }

    if (text.length > maxLength) {
        var exploded = text.split(" ");
        var counter = 0;
        var i = 0;
        var response = [];

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
