class ServicesContainer {
    constructor() {
        this._instances = {};
        this._map = {};
    }

    /**
     * @param {String} serviceName
     * @param {Class} service
     */
    define(serviceName, service) {
        this._map[serviceName] = service;
    }

    /**
     * @param {String} serviceName
     * @param {Object} instance
     */
    setInstance(serviceName, instance) {
        this._instances[serviceName] = instance;
    }

    /**
     * @param {String} serviceName
     * @returns {Object}
     */
    get(serviceName) {
        if (!this._instances.hasOwnProperty(serviceName)) {
            this.setInstance(serviceName, this.getNewInstance(serviceName));
        }

        return this._instances[serviceName];
    }

    /**
     * @param {String} serviceName
     */
    getNewInstance(serviceName) {
        if (!this._map.hasOwnProperty(serviceName)) {
            throw new Error(`Service ${serviceName} not found`);
        }

        return new this._map[serviceName]();
    }
}

export default ServicesContainer;
