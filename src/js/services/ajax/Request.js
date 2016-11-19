import App from "app";

const sa = App.libs.Superagent;
const EM = App.ServicesContainer.getNewInstance("EventManager");
const _ = App.libs._;

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
 * Utility class to make XHR requests
 * 
 * @class Request
 */
class Request {
    constructor() {
        this.EM = EM;
    }

    /**
     * Register a new event listener to be called when a new request is started
     * @param  {Function} parameters: req
     * @return {Request}
     */
    onStart(cb) {
        "use strict";

        this.EM.subscribe("start", cb);
        return this;
    }

    /**
     * Register a new event listener to be called when an request is completed
     * @param  {requestCallback} cb
     * @return {Request}
     */
    onStop(cb) {
        "use strict";

        this.EM.subscribe("stop", cb);
        return this;
    }

    /**
     * Register a new event listener to be called when an request fails
     * @param  {requestCallback} cb
     * @return {Request}
     */
    onError(cb) {
        "use strict";

        this.EM.subscribe("error", cb);
        return this;
    }

    /**
     * Register a new event listener to be called when an request succeeds
     * @param  {successfulRequestCallback} cb
     * @return {Request}
     */
    onSuccess(cb) {
        "use strict";

        this.EM.subscribe("success", cb);
        return this;
    }

    /**
     * make a xhr
     * @param  {String} method    get|post|put|delete|del
     * @param  {String} url
     * @param  {Object} data
     * @param  {successfulRequestCallback} onSuccess function to be called if the request succeeds
     * @param  {requestCallback} onError   function to be called if the request fails
     * @return {null}
     */
    send(method, url, data, onSuccess, onError) {
        "use strict";

        const req = sa[method](url);

        if (method === "get") {
            req.query(data);
        } else {
            req.send(data);
        }

        this.EM.notify("start", req);

        req.end((err, res) => {
            this.EM.notify("stop", err, res, req);

            if (err) {
                this.EM.notify("error", err, res, req);

                if (onError) {
                    onError(err, res, req);
                }
            } else {
                this.EM.notify("success", res, req);

                if (onSuccess) {
                    onSuccess(res, req);
                }
            }
        });
    }

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
    make(config) {
        "use strict";

        let defaultOptions = {
            url: "",
            method: "get",
            onStart: null,
            onStop: null,
            onSuccess: null,
            onError: null,
            headers: {},
            data: {}
        };

        let options = _.extend(defaultOptions, config);

        if (options.method === "delete") {
            options.method = "del";
        }

        let req = sa[options.method](options.url).send(options.data);

        this.EM.notify("start", req);
        if (typeof options.onStart === "function") {
            options.onStart(req);
        }

        // headers
        _.forEach(options.headers, function (value, key) {
            req.set(key, value);
        });

        req.end((err, res) => {
            this.EM.notify("stop", err, res, req);
            if (typeof options.onStop === "function") {
                options.onStop(err, res, req);
            }

            if (err) {
                this.EM.notify("error", err, res, req);
                if (typeof options.onError === "function") {
                    options.onError(err, res, req);
                }
            } else {
                this.EM.notify("success", res, req);

                if (typeof options.onSuccess === "function") {
                    options.onSuccess(res, req);
                }
            }
        });
    }
}

export default Request;
