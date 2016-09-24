import App from "app";
const _ = App.libs._;

class RestInterface {
    /**
     * @param {String} serviceName   name of the service (used to emmit events)
     * @param {String} basepath
     */
    constructor(serviceName, basepath) {
        this.serviceName = serviceName;
        this.basepath = basepath;

        this.Request = App.ServicesContainer.get("AJAX");
        this.EM = App.EventManager;

        this.collection = [];
    }

    /**
     * Get all itens
     * @method index
     * @param  {Object} data      querystring
     * @param  {Function} onSuccess
     * @param  {Function} onError
     * @return {null}
     */
    index(data, onSuccess, onError) {
        this.Request.send("get", this.basepath, data, onSuccess, onError);
    }

    /**
     * Fetch single item
     * @param {String|Number} id
     * @param {Function}      onSuccess
     * @param {Function}      onError
     */
    show(id, onSuccess, onError) {
        this.Request.send("get", this.basepath + "/" + id, {}, onSuccess, onError);
    }

    /**
     * Create a new item
     * @param {Object}   data
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    store(data, onSuccess, onError) {
        this.Request.send(
            "post",
            this.basepath,
            data,
            (res, req) => {
                this.EM.notify(this.serviceName + ".create", res, req);

                if (typeof onSuccess === "function") {
                    onSuccess(res, req);
                }
            },
            (err, res, req) => {
                this.EM.notify(this.serviceName + ".create.error", err, res, req);

                if (typeof onError === "function") {
                    onError(err, res, req);
                }
            }
        );
    }

    /**
     * @param {Object}   data
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    update(data, onSuccess, onError) {
        let id = null;

        if (data.hasOwnProperty("id")) {
            id = data.id;
        } else {
            id = this._extractId(data);
        }

        const payload = _.merge(data, {_method: "PUT"});
        this.Request.send(
            "post",
            this.basepath + "/" + id,
            payload,
            (res, req) => {
                this.EM.notify(this.serviceName + ".update", res, req);

                if (typeof onSuccess === "function") {
                    onSuccess(res, req);
                }
            },
            (err, res, req) => {
                this.EM.notify(this.serviceName + ".update.error", err, res, req);

                if (typeof onError === "function") {
                    onError(err, res, req);
                }
            }
        );
    }

    /**
     * @param {Object}   data
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    destroy(data, onSuccess, onError) {
        let id = null;
        if (data.hasOwnProperty("id")) {
            id = data.id;
        } else {
            id = this._extractId(data);
        }

        const payload = _.merge(data, {_method: "DELETE"});
        this.Request.send(
            "post",
            this.basepath + "/" + id,
            payload,
            (res, req) => {
                this.EM.notify(this.serviceName + ".destroy", res, req);

                if (typeof onSuccess === "function") {
                    onSuccess(res, req);
                }
            },
            (err, res, req) => {
                this.EM.notify(this.serviceName + ".destroy.error", err, res, req);

                if (typeof onError === "function") {
                    onError(err, res, req);
                }
            }
        );
    }
}

export default RestInterface;