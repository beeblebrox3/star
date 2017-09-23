import Config from "./core/Config";

const ConfigInstance = new Config();
for (const config in APP_CONFIG) {
    if (APP_CONFIG.hasOwnProperty(config)) {
        ConfigInstance.set(config, APP_CONFIG[config]);
    }
}

export default ConfigInstance;
