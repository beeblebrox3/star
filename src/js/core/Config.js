var Config = function () {
    "use strict";

    var configs = [];

    /**
     * Get value of a config
     * @param  {string} configName
     * @param  {mixed}  defaultValue defines what return if config doesn't exists
     * @return {mixed}
     */
    this.get = function getConfig(configName, defaultValue) {
        if (configs.hasOwnProperty(configName)) {
            return configs[configName];
        }

        return defaultValue;
    };

    /**
     * Set value to a config
     * @param {string} configName
     * @param {string|object|number|undefined}  value
     */
    this.set = function setConfig(configName, value) {
        configs[configName] = value;
    };
};

module.exports = Config;
