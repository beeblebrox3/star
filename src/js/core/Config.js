class Config {
    constructor() {
        this._configs = [];
    }

    /**
     * @param {String} configName
     * @param {*} value
     */
    set(configName, value) {
        this._configs[configName] = value;
    }

    /**
     * @param {String} configName
     * @param {*} defaultValue
     * @returns {*}
     */
    get(configName, defaultValue = null) {
        return this._configs[configName] || defaultValue;
    }
}

export default Config;
