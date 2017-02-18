import Config from "./core/Config";
import env from "env";

const ConfigInstance = new Config();

for (let config in env) {
    if (env.hasOwnProperty(config)) {
        ConfigInstance.set(config, env[config]);
    }
}

export default ConfigInstance;
