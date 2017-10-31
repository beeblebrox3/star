import App from "app";
const _ = App.libs._;

class RestInterface {
    /**
     * @param {String} serviceName   name of the service (used to emmit events)
     * @param {String} basepath
     * @todo add cache config
     */
    constructor(serviceName, basepath, idField = "id") {
        this.serviceName = serviceName;
        this.basepath = basepath;
        this.idField = idField;

        this.Request = App.ServicesContainer.get("AJAX");
        this.EM = App.EventManager;

        this.collection = [];
    }

    /**
     * Get all itens
     * @method index
     * @param  {Object} data querystring
     * @return {Promise}
     */
    index(data) {
        return new Promise((resolve, reject) => {
            this.Request.send("get", this.basepath, data, (res) => {
                resolve(res.body);
            }, (err, res) => {
                reject(err, res);
            });
        });
    }

    /**
     * Fetch single item
     * @param {String|Number} id
     * @return {Promise}
     */
    show(id) {
        return new Promise((resolve, reject) => {
            this.Request.send("get", `${this.basepath}/${id}`, {}, (res) => {
                resolve(res.body);
            }, (err, res) => {
                reject({err, res});
            });
        });
    }

    /**
     * Create a new item
     * @param {Object}   data
     * @return {Promise}
     */
    store(data) {
        return new Promise((resolve, reject) => {
            this.Request.send(
                "post",
                this.basepath,
                data,
                (res, req) => {
                    this.EM.notify(this.serviceName + ".create", res, req);
                    resolve(res.body);
                },
                (err, res, req) => {
                    this.EM.notify(this.serviceName + ".create.error", err, res, req);
                    reject({err, res, req});
                }
            );
        });
    }

    /**
     * @param {Object}   data
     * @return {Promise}
     */
    update(data) {
        let id = null;

        if (data.hasOwnProperty(this.idField)) {
            id = data[this.idField];
        } else {
            id = this._extractId(data);
        }

        let payload = data;
        payload._method = "PUT";


        return new Promise((resolve, reject) => {
            this.Request.send(
                "post",
                this.basepath + "/" + id,
                payload,
                (res, req) => {
                    this.EM.notify(this.serviceName + ".update", res, req);
                    resolve(res.body);
                },
                (err, res, req) => {
                    this.EM.notify(this.serviceName + ".update.error", err, res, req);
                    reject({err, res, req});
                }
            );
        });
    }

    /**
     * @param {Object}   data
     * @return {Promise}
     */
    destroy(data) {
        let id = null;
        if (data.hasOwnProperty(this.idField)) {
            id = data[this.idField];
        } else {
            id = this._extractId(data);
        }

        let payload = data;
        payload._method = "DELETE";

        return new Promise((resolve, reject) => {
            this.Request.send(
                "post",
                this.basepath + "/" + id,
                payload,
                (res, req) => {
                    this.EM.notify(this.serviceName + ".destroy", res, req);
                    resolve(res);
                },
                (err, res, req) => {
                    this.EM.notify(this.serviceName + ".destroy.error", err, res, req);
                    reject({err, res, req});
                }
            );
        });
    }
}

export default RestInterface;
