import App from "app";

const sa = App.libs.Superagent;
const EM = App.ServicesContainer.getNewInstance("EventManager");

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
     * @param  {requestCallback} cb
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
     * @param  {String} method get|post|put|delete|del
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
     * @param  {String} config.url URL to make the request
     * @param  {String} config.method The method. One of: get, post, put, del, delete
     * @param  {Function} config.onStart Callback called before send the resquest
     * @param  {requestCallback} config.onStop Callback called after complete the request
     * @param  {successfulRequestCallback} config.onSuccess Callback for successful request. Called after onStop
     * @param  {requestCallback} config.onError Callback for unsuccessful request. Called after onStop
     * @param  {Object} config.headers Option headers. Example: {accept: "application/json"}
     * @param  {Object} config.data Data to send to the server
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

        let options = Object.assign({}, defaultOptions, config);

        if (options.method === "delete") {
            options.method = "del";
        }

        let req = sa[options.method](options.url).send(options.data);

        this.EM.notify("start", req);
        if (typeof options.onStart === "function") {
            options.onStart(req);
        }

        // headers
        Object.keys(options.headers).map((header) => req.set(header, options.headers[header]));

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
