var App = require("app");
var AJAX = App.ServicesContainer.get("AJAX");
var EM = App.EventManager;
var _ = App.libs._;

/**
 * @param {String} serviceName   name of the service (used to emmit events)
 * @param {String} basepath
 */
function RestInterface(serviceName, basepath) {
    "use strict";

    this.serviceName = serviceName;
    this.basepath = basepath;

    this.collection = {};
}

/**
 * Get all itens
 * @method index
 * @param  {Object} data      querystring
 * @param  {Function} onSuccess
 * @param  {Function} onError
 * @return {null}
 */
RestInterface.prototype.index = function (data, onSuccess, onError) {
    "use strict";

    AJAX.send("get", this.basepath, data, onSuccess, onError);
};

/**
 * Fetch single item
 * @param {String|Number} id
 * @param {Function}      onSuccess
 * @param {Function}      onError
 */
RestInterface.prototype.show = function (id, onSuccess, onError) {
    "use strict";

    AJAX.send("get", this.basepath + "/" + id, {}, onSuccess, onError);
};

/**
 * Create a new item
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.store = function (data, onSuccess, onError) {
    "use strict";

    AJAX.send(
        "post",
        this.basepath,
        data,
        function (res, req) {
            EM.notify(self.serviceName + ".create", res, req);

            if (typeof onSuccess === "function") {
                onSuccess(res, req);
            }
        },
        function (err, res, req) {
            EM.notify(self.serviceName + ".create.error", err, res, req);

            if (typeof onError === "function") {
                onError(err, res, req);
            }
        }
    );
};

/**
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.update = function (data, onSuccess, onError) {
    "use strict";

    var id = null;
    if (data.hasOwnProperty("id")) {
        id = data.id;
    } else {
        id = this._extractId(data);
    }

    var payload = _.merge(data, {_method: "PUT"});
    AJAX.send(
        "post",
        this.basepath + "/" + id,
        payload,
        function (res, req) {
            EM.notify(self.serviceName + ".update", res, req);

            if (typeof onSuccess === "function") {
                onSuccess(res, req);
            }
        },
        function (err, res, req) {
            EM.notify(self.serviceName + ".update.error", err, res, req);

            if (typeof onError === "function") {
                onError(err, res, req);
            }
        }
    );
};

/**
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.destroy = function (data, onSuccess, onError) {
    "use strict";

    var id = null;
    if (data.hasOwnProperty("id")) {
        id = data.id;
    } else {
        id = this._extractId(data);
    }

    var payload = _.merge(data, {_method: "DELETE"});
    AJAX.send(
        "post",
        this.basepath + "/" + id,
        payload,
        function (res, req) {
            EM.notify(self.serviceName + ".destroy", res, req);

            if (typeof onSuccess === "function") {
                onSuccess(res, req);
            }
        },
        function (err, res, req) {
            EM.notify(self.serviceName + ".destroy.error", err, res, req);

            if (typeof onError === "function") {
                onError(err, res, req);
            }
        }
    );
};

module.exports = RestInterface;
