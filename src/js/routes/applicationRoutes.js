import App from "app";

const Pages = App.components.pages;
const Router = App.service("ROUTER");

Router.setDefaultLayout(App.components.Application);
Router.setDefaultTitle("Star");

Router.addRoute("/", Pages.Home);
Router.addRoute("/foo", Pages.Foo);
Router.addRoute("/movies", Pages.Movies);
Router.addRoute("/:type/:mediaToDisplay", Pages.Detail);

Router.addResolver("mediaToDisplay", (value, context, next) => {
    const hash = {
        tv: "tv",
        movie: "movie",
        person: "person"
    };

    if (!hash.hasOwnProperty(context.params.type)) {
        Router.setRoute("/not-found"); // @todo improve
        return;
    }

    App.provider("Movies").get(hash[context.params.type], value)
        .then(media => {
            context.params.media = media;
            context.params.media.media_type = context.params.type;
            next();
        })
        .catch(err => {
            Router.setRoute("/not-found"); // @todo improve
        });
});

/******************************************************************************/
/* Examples *******************************************************************/
/******************************************************************************/

// Given an url argument named :userId will fetch user data from API and
// add to context
// Router.addResolver("userId", (value, context, next) => {
//     // you can render an loading animation, if you want
//     App.providers("user").find(value).then(user => {
//         context.user = user;
//         next();
//     });
// });

// // Add a route that don't render a component
// Router.addRoute("/another-route", {
//     handler: (context) => console.log("do stuff"),
// });


/******************************************************************************/
/* Not found ******************************************************************/
/******************************************************************************/
Router.addRoute("*", {
    component: App.components.NotFound,
    title: "Ops!"
});
