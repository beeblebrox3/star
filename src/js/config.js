var Config = require("./core/Config");

var ConfigInstance = new Config();
ConfigInstance.set("basepath", "http://localhost:3000/");
ConfigInstance.set("language", "pt-br");
ConfigInstance.set("debug", true);

module.exports = ConfigInstance;
