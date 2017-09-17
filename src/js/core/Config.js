/**
 * Class to handle configurations of the application
 *
 * @class Config
 */
class Config {
    constructor() {
        this._configs = [];
    }

    /**
     * Set a new or update an existing configuration
     * @param {String} configName Config name
     * @param {*} value Config value
     */
    set(configName, value) {
        this._configs[configName] = value;
    }

    /**
     * Get the value of the configuration or the default value
     *
     * @param {String} configName Config name
     * @param {*} defaultValue Value to return if config doesn't exists
     * @returns {*}
     */
    get(configName, defaultValue = null) {
        return this._configs[configName] || defaultValue;
    }
}

export default Config;
