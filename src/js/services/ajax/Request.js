var App = require("app");
var sa = App.libs.Superagent;
var EM = App.ServicesContainer.getNewInstance("EventManager");
var _ = App.libs._;

function Request() {
    "use strict";

    this.EM = EM;
}

/**
 * @callback requestCallback
 * @param {mixed}   error
 * @param {Object}  response
 * @param {Object}  reqquest
 */
 /**
  * @callback successfulRequestCallback
  * @param {mixed}   error
  * @param {Object}  response
  * @param {Object}  reqquest
  */

/**
 * @param  {Function} parameters: req
 * @return {Request}
 */
Request.prototype.onStart = function (cb) {
    "use strict";

    this.EM.subscribe("start", cb);
    return this;
};

/**
 * @param  {requestCallback} cb
 * @return {Request}
 */
Request.prototype.onStop = function (cb) {
    "use strict";

    this.EM.subscribe("stop", cb);
    return this;
};

/**
 * @param  {requestCallback} cb
 * @return {Request}
 */
Request.prototype.onError = function (cb) {
    "use strict";

    this.EM.subscribe("error", cb);
    return this;
};

/**
 * @param  {successfulRequestCallback} cb
 * @return {Request}
 */
Request.prototype.onSuccess = function (cb) {
    "use strict";

    this.EM.subscribe("success", cb);
    return this;
};

/**
 * make a xhr
 * @param  {String} method    get|post|put|delete|del
 * @param  {String} url
 * @param  {Object} data
 * @param  {successfulRequestCallback} onSuccess function to be called if the request succeeds
 * @param  {requestCallback} onError   function to be called if the request fails
 * @return {null}
 */
Request.prototype.send = function (method, url, data, onSuccess, onError) {
    "use strict";

    var self = this;
    var req = sa[method](url);

    if (method === "get") {
        req.query(data);
    } else {
        req.send(data);
    }

    this.EM.notify("start", req);

    req.end(function (err, res) {
        self.EM.notify("stop", err, res, req);

        if (err) {
            self.EM.notify("error", err, res, req);

            if (onError) {
                onError(err, res, req);
            }
        } else {
            self.EM.notify("success", res, req);

            if (onSuccess) {
                onSuccess(res, req);
            }
        }
    });
};

/**
 * make a xhr with more options
 * @param  {Object} config
 * @param  {String} config.url
 * @param  {String} config.method get|post|put|del|delete
 * @param  {Function} config.onStart function to call before send the resquest
 * @param  {requestCallback} config.onStop
 * @param  {successfulRequestCallback} config.onSuccess
 * @param  {requestCallback} config.onError
 * @param  {Object} config.headers
 * @param  {Object} config.data 
 */
Request.prototype.make = function (config) {
    "use strict";

    var defaultOptions = {
        url: "",
        method: "get",
        onStart: null,
        onStop: null,
        onSuccess: null,
        onError: null,
        headers: {},
        data: {}
    };

    var self = this;
    var options = _.extend(defaultOptions, config);

    if (options.method === "delete") {
        options.method = "del";
    }
    var req = sa[options.method](options.url).send(options.data);

    this.EM.notify("start", req);
    if (typeof options.onStart === "function") {
        options.onStart(req);
    }
    // headers
    _.forEach(options.headers, function (value, key) {
        req.set(key, value);
    });

    req.end(function (err, res) {
        self.EM.notify("stop", err, res, req);
        if (typeof options.onStop === "function") {
            options.onStop(err, res, req);
        }

        if (err) {
            self.EM.notify("error", err, res, req);
            if (typeof options.onError === "function") {
                options.onError(err, res, req);
            }
        } else {
            self.EM.notify("success", res, req);

            if (typeof options.onSuccess === "function") {
                options.onSuccess(res, req);
            }
        }
    });
}

module.exports = Request;
