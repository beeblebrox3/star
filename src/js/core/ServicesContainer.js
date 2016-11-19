/**
 * An utility class to manage services.
 * You can define your own services, share instances between components and create
 * new instances when necessaru
 * 
 * @class ServicesContainer
 */
class ServicesContainer {
    /**
     * Creates an instance of ServicesContainer.
     * 
     * 
     * @memberOf ServicesContainer
     */
    constructor() {
        this._instances = {};
        this._map = {};
    }

    /**
     * Register new services.
     * @param {String} serviceName name of the service (how clients will use it)
     * @param {Class|Function} service the class/constructor of the service
     */
    define(serviceName, service) {
        this._map[serviceName] = service;
    }

    /**
     * Register an instance of a service. If you only set the instance but not
     * the constructor (with the define method) this service will be like an singleton.
     * Nobody will be able to create an new instance of the service via ServicesContainer
     * 
     * @param {String} serviceName
     * @param {Object} instance
     */
    setInstance(serviceName, instance) {
        this._instances[serviceName] = instance;
    }

    /**
     * Get an instance of a service. If the instance doens't exists yet it will
     * instantiate it and return
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
     * Get a new instance of a service. Note that if you do not provide an constructor/class,
     * this method will fail
     * @param {String} serviceName
     */
    getNewInstance(serviceName) {
        if (this._instances.hasOwnProperty(serviceName) && !this._map.hasOwnProperty(serviceName)) {
            throw new Error(`Service ${serviceName} is an singleton, you cannot create a new instance`);
        }

        if (!this._map.hasOwnProperty(serviceName)) {
            throw new Error(`Service ${serviceName} not found`);
        }

        return new this._map[serviceName]();
    }
}

export default ServicesContainer;
