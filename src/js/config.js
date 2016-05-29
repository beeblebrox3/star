var Config = require("./core/Config");
var ConfigInstance = new Config();

var env = require(".env.js");

for (var config in env) {
    if (env.hasOwnProperty(config)) {
        ConfigInstance.set(config, env[config]);
    }
}

module.exports = ConfigInstance;
