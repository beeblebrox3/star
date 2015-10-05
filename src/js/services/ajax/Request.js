var App = require("app");
var sa = App.libs.Superagent;
var EM = App.ServicesContainer.getNewInstance("EventManager");

function Request() {
    "use strict";

    this.EM = EM;
}

Request.prototype.onStart = function (cb) {
// function (req) {}
    "use strict";

    this.EM.subscribe("start", cb);
    return this;
};

// function (err, res, req) {}
Request.prototype.onStop = function (cb) {
    "use strict";

    this.EM.subscribe("stop", cb);
    return this;
};

// function (err, res, req) {}
Request.prototype.onError = function (cb) {
    "use strict";

    this.EM.subscribe("error", cb);
    return this;
};

// function (res, req) {}
Request.prototype.onSuccess = function (cb) {
    "use strict";

    this.EM.subscribe("success", cb);
    return this;
};

// @todo validate method
Request.prototype.send = function (method, url, data, onSuccess, onError) {
    "use strict";

    var self = this;
    var req = sa[method](url).send(data);

    this.EM.notify("start", req);

    req.end(function (err, res) {
        self.EM.notify("stop", err, req, res);

        if (err) {
            self.EM.notify("error", err, req, res);

            if (onError) {
                onError(err, req, res);
            }
        } else {
            self.EM.notify("success", req, res);

            if (onSuccess) {
                onSuccess(res, req);
            }
        }
    });
};


module.exports = Request;
