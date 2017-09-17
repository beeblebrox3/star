import App from "app";
import Application from "./Application";
import NotFound from "./NotFound";

require("./base/index");
require("./pages/index");

App.components.Application = Application;
App.components.NotFound = NotFound;

