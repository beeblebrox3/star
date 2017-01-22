import App from "app";

import ArrayHelpers from "./array/index";
import DateHelpers from "./array/index";
import StringHelpers from "./array/index";

App.helpers.array = ArrayHelpers;
App.helpers.date = DateHelpers;
App.helpers.string = StringHelpers;

require("./object/index");

