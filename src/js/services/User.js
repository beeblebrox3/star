import App from "app";
import RestInterface from "./RestInterface";

class User extends RestInterface {
    constructor() {
        super("User", App.Config.get("basepath") + "apiusers")
    }
}

export default User;
