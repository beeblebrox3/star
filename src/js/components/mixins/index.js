var App = require("app");

App.components.mixins = {};

App.components.mixins.ValidableForm = {
    setInvalidFieldsFromErrors: function (data) {
        "use strict";

        this.setState({
            invalidFields: JSON.parse(data.response.responseText)
        });
    }
};


App.components.mixins.LinkedState = {
    linkState: function (path) {
        "use strict";

        var state = App.libs._.cloneDeep(this.state);
        var self = this;

        var handleChange = function (value) {
            App.helpers.object.setFlattened(path, value, state);
            self.setState(state);
        };

        return {
            value: App.helpers.object.getFlattened(path, this.state),
            requestChange: handleChange
        };
    }
};
