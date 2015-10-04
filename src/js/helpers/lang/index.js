var App = require("app");
var messages = require("./messages");

App.helpers.Lang = {
    "get": function (identifier, language, defaultValue) {
        "use strict";

        if (language === undefined) {
            language = App.Config.get("language");
        }

        if (defaultValue === undefined) {
            defaultValue = identifier;
        }

        if (!messages.hasOwnProperty(language)) {
            return defaultValue;
        }

        if (!messages[language].hasOwnProperty(identifier)) {
            return defaultValue;
        }

        return messages[language][identifier];
    }
};
