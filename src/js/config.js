var Config = require("./core/Config");

var ConfigInstance = new Config();
ConfigInstance.set("language", "pt-br");
ConfigInstance.set("debug", true);

module.exports = ConfigInstance;
