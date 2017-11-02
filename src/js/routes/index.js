import App from "app";
import Router from "../core/Router";

const routerInstance = Router(document.querySelector("#react-root"), App.libs.Page);

App.ServicesContainer.setInstance("ROUTER", routerInstance);

require("./middlewares");
require("./applicationRoutes");

routerInstance.start();
