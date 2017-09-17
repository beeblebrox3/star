import App from "app";
import qs from "qs";

// parse querystring
App.service("ROUTER").addMiddleware("*", (context, next) => {
    let query = context.canonicalPath;
    if (query && query.length) {
        query = query.split("?")[1] || "";
    }

    context.query = qs.parse(query || location.search.slice(1));
    next();
});
