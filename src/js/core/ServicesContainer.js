var App = require("app");

var ServicesContainer = function () {
    "use strict";

    this.instances = {};
    this.map = {};
};

ServicesContainer.prototype.define = function (serviceName, service, context) {
    "use strict";

    if (!context) {
        context = App;
    }

    if (typeof service === "string") {
        service = App.helpers.object.getFlattened(service, context);
    }

    this.map[serviceName] = service;
};

ServicesContainer.prototype.setInstance = function (serviceName, instance) {
    "use strict";

    this.instances[serviceName] = instance;
};

/**
 * @param {string} serviceName
 */
ServicesContainer.prototype.get = function (serviceName) {
    "use strict";

    if (this.instances.hasOwnProperty(serviceName)) {
        return this.instances[serviceName];
    }

    this.setInstance(serviceName, this.getNewInstance(serviceName));
    return this.instances[serviceName];
};

ServicesContainer.prototype.getNewInstance = function (serviceName) {
    "use strict";

    if (!this.map.hasOwnProperty(serviceName)) {
        throw "Service " + serviceName + " not found";
    }

    return new this.map[serviceName]();
};

module.exports = ServicesContainer;
