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
     * @param {String} configName
     * @param {*} value
     */
    set(configName, value) {
        this._configs[configName] = value;
    }

    /**
     * Get the value of the configuration or the default value
     * @param {String} configName
     * @param {*} defaultValue
     * @returns {*}
     */
    get(configName, defaultValue = null) {
        return this._configs[configName] || defaultValue;
    }
}

export default Config;
