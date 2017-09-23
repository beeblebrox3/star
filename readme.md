# Star

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/beeblebrox3/star/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/beeblebrox3/star/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/beeblebrox3/star/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/beeblebrox3/star/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/beeblebrox3/star/badges/build.png?b=master)](https://scrutinizer-ci.com/g/beeblebrox3/star/build-status/master)

> [Demo](https://star.luque.cc/)

## About
This project is just a place for me to think about how  organize my front-end code. I'm not suggesting you to use, but you can - and I hope you do - ask questions or make suggestions ;)

> This project is still in development, as well as this documentation.

## Tools
The main tools here are:
 - [React](https://facebook.github.io/react/);
 - [Webpack](https://webpack.github.io/);

## Install

Clone, yarn and run!

```shell
# clone
git clone git@github.com:beeblebrox3/star
cd star

# install dependencies
yarn install

# start dev server
yarn dev

# to build the production build:
yarn prod
```

You can also start your own project with star without clone this repo:
```shell
curl https://gist.githubusercontent.com/beeblebrox3/a43f83be69572bcfff154134c503248a/raw/138156b1b56e0ddbc71d1f0a6fb2b49b97ee1c3b/create_star_project.sh | bash -s <your project name>
```
This will download star to an folder with the name of your project.

## How the code is organized
### Namespaces
A good design principle is maintain a single global variable, so we have `App`.
Inside it we put all libraries, components etc.
We have something like:

```javascript
// /index.js
const App = {
	helpers:    {}, // for your app custom helpers
	libs:       {}, // for 3rd party libs, like React
	components: {}, // for all your react components
};
```

#### libs
Libraries like [jQuery](http://jquery.com/), [moment](http://momentjs.com/) or [React](https://facebook.github.io/react/) are placed into `App.libs` namespace:

```javascript
import App from "app"
import React from "react"

App.libs.React = React
```

If you need multiple versions of the same library (don't know why), you can indicate the version to:

```javascript
App.libs.jQuery1_2_3: require('../paht-to-jquery-1.2.3');
```
> I hope you never have to do that :)

If the lib is already on the page, like developing on an existing application or you are using a CDN, you can, to maintain the structure, do something like this:

```javascript
App.libs.React = window.React;
```
In this case, React is available globally. So we put it on our namespace to make easy to change this in the future without have to change all code that uses React.

> Tip: you can replace App.libs.React with [Inferno](https://infernojs.org/) and everything still works.

#### helpers
We wrote a lot of functions that are used in multiple places and a nice thing to do is keep them well organized according to it scopes. Let's see an example:

```javascript
// /helpers/xpto.js

import App from "app"
App.helpers.xpto = () => return "foo";

// on another file
import App from "app";
console.log(App.helpers.xpto()); // "foo"
```

> Tip: Star has some helpers to help you out. They were moved to [another project](https://www.npmjs.com/package/super-helpers) to be used by another tools. They are available in `App.libs.shelpers`. For documentation, [see here](https://beeblebrox3.github.io/super-helpers/).

#### components
Here we have, of course, components. I'm using React, so it's React Components. Like this:

```jsx
// /components/homepage.js file
import App from "app"
const React = App.libs.React;

App.components.HomePage = function () {
  return (
    <div>
      Hello!
      { props.children }
    </div>
  );
};
```

#### services and providers
Services and providers provide data to the components. They can interact with the backend, local storage, cookies etc. We have a special way to get those services on our components, but we'll see this  later.

### Files and directories
Here's the `src/js` direcotry.
```
└── src/js
    ├── app.js
    ├── bootstrap.js
    ├── components
    │   ├── Application.js
    │   ├── base
    │   │   └── index.js
    │   ├── index.js
    │   ├── NotFound.js
    │   └── pages
    │       ├── Foo.js
    │       ├── Home.js
    │       └── index.js
    ├── config.js
    ├── core
    │   ├── Config.js
    │   ├── EventManager.js
    │   ├── Router.js
    │   └── ServicesContainer.js
    ├── helpers
    │   └── index.js
    ├── providers
    │   └── index.js
    ├── routes
    │   ├── applicationRoutes.js
    │   ├── index.js
    │   └── middlewares.js
    └── services
        ├── ajax
        │   └── Request.js
        ├── cache
        │   └── Persistent.js
        ├── index.js
        └── RestInterface.js
```

I created some patterns around here, let's see some of them.
All starts with the file `bootstrap.js`. It requires the other files and core modules.
One convention that I have is that each namespace has its own directory. Inside this directory must exists a `index.js` file, that creates the namespace and requires the other files. The namespaces can have a complex structure, with a bunch of subfolders and this pattern (and `index.js` file) can be applied to.

### Core Modules
This package has some modules that make this strutcture work. Let's see them:

#### Config
This module is responsible for the application's configurations. The API is very simple (inspired on [Laravel](http://laravel.com/)).

```javascript
App.Config.get("inexistent_config");
App.Config.get("inexistent_config", "default value");
App.Config.set("inexistent_config", "some value");
App.Config.get("inexistent_config");

// shortcut
App.config("existent_config"); // shortcut to App.Config.get
```

The previous code shows how `Config` module works. You have just two methods: `get()` and `set()` .
On the first line, `get()` will return `null`, because there's no config with the name `inexistent_config`.
The second one will return the string "default value", because the second parameter of the `get()` method is the default value if the config doesn't exists.
On the third line we set the "some value" as value to the "inexistent_config" config.
Finally, in the fourth line we have "some value" as returned value, because we set this value for "inexistent_config".
This module is available on all components, libs, services etc, because is defined in the first lines of bootstrap.js file.
The  default configuration values can be set on the `config.js` file on root folder.

Star have a special file to put environment configs. On the root folder, you can see that we have a `.env.example.js`. You can copy this file as `.env.js` to use it and change/add configurations as you need.

You can have multiple env files to represent different environments where the app will run. Star will search for `.env.<environment name>.js` (ie: `.env.dev.js` or `.env.production.js`). You specify the environment on `NODE_ENV` :

```shell
env NODE_ENV=production yarn build // will search for .env.production.js or fallback to .env.js
```

You can override the values from the envfile too:

```shell
env CUSTOM_CONFIG=value yarn build
```

> Tip: You only can override configs that are present on `.env.js`.

On the build process, webpack will create an global variable named `APP_CONFIG`. The `config.js` file will put those configs on the Config instance.

### EventManager
This module, like the name suggests, allows you to fire and observe application's events. Let's see:

```javascript
const eventHandler = function () {
	// do something
};

// eventHandler will be called when an event called "eventName" is fired
App.EventManager.subscribe("eventName", eventHandler);

// eventHandler will be called when "eventA" or "eventB" is fired
App.EventManager.subscribeMultiple(
	["eventA", "eventB"],
	eventHandler
);

// unsubscribe from "eventName"
App.EventManager.unsubscribe("eventName", eventHandler);

// unsubscribe from "eventA" and "eventB"
App.EventManager.unsubscribeMultiple(
	["eventA", "eventB"],
	eventHandler
);

// fire "eventA" and pass to callbacks two parameters
App.EventManager.notify("eventA", "parameter1", "parameter2");
```

You can define as many handlers you want for each event.

**Tip**: the subscrive method returns an function that do the unsubscribe. Sou you can for instance: 
```js
const dispose = App.EventManager("EventX", () => console.log("x"));

dispose(); // will unsubscrive
```

### ServicesContainer
This module aims to be a single point to get any service from the application. It allows you to share instances from services between components, for example, without need to pass it over props (react components) or other means, but keeping the flexibility to create new instances if you need it.
Let's see some code:

```javascript
const ServiceXPTO = function () {
};
ServiceXPTO.prototype.sayHi() {
	return "Hi :D";
};

App.ServicesContainer.define("ServiceXPTO", ServiceXPTO);

App.ServicesContainer.get("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.get("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.getNewInstance("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.setInstance("AnotherServiceXPTO", new ServiceXPTO());

// shortcut
App.service("ServiceXPTO").sayHi(); // returns "Hi :D"
```

We use the `define()` (or `register()`) method to register services on ServicesContainer. You can name it like you want. With `get()` method we get an instance of the service. At the first time that this method is called for get a specific service, the container will instantiate this service (` new ServiceName()`) and returns it. Next time you ask for this service, the same instance will be returned. If you need a new instance, even after call `get()` N times before, you can use the method `getNewInstance()`.
The method `setInstance()` allows you to pass to the container the instance that the `get()` method should return. If you don't register the service with the `define()` method, the getNewInstance() will not work. So consider `the setInstance()` as a way to create a [Singleton](https://pt.wikipedia.org/wiki/Singleton).

By default, we have 3 registered services. **EventManager**, **ROUTER** and **AJAX**.
The **EventManager** is not the App.EventManager, but it's constructor. Some services can have it's own internal events handlers, like the `Request`. They can use a clean instance of EventManager to not mess with the application events.
**ROUTER** is the Star's Router. More about it later.
Finally, **AJAX** is a service that I built to simplify ajax requests. I was using jQuery, but wanna to try without it (more about it later).

## AJAX
jQuery was present on a lot of the projects that I worked on, so almost all my ajax stuff was built with it. This project don't. I'm using [Superagent](https://github.com/visionmedia/superagent). But I want to make much easy to use it with the services, so I built a wrapper to help.
It's a registered service named `AJAX` (`App.ServicesContainer.get("AJAX")`).
Let's see an example:

```javascript
const Request = App.ServicesContainer.get("AJAX");

Request.onStart(function (req) {
	// do stuff before every request made with this instance
});

Request.onStop(function (err, res, req) {
	// do stuff after every request is completed.
	// occurs before of onSuccess and onError
});

Request.onSuccess(function (res, req) {
	// do stuff when any request is completed with success.
	// occurs after onStop
});

Request.onError(function (err, res, req) {
	// do stuff when any request fails.
	// occurs after onStop
});

// make a POST request
Request.send(
	"post",
	"http://foo/bar",
	{name: "foo"},
	function (res, req) {
		// do stuff if success
	},
	function (err, res, req) {
		// do stuff if fails
	}
);

// make another POST request
Request.make({
	url: "http://foo/bar",
    method: "post",
    onStart: function (req) {
	    // before make the request
    },
    onStop: function (err, res, req) {
	    // after the request is completed
    },
    onSuccess: function (res, req) {
		// if request is successful
    },
    onError: function (err, res, req) {
	    // if request fails
    },
    headers: {
	    "accept": "application/json"
    },
    data: {
	    name: "George"
    }
});
```

On all callbacks, the argument `req` is the request created with Superagent and you can interact with it over there.

> This service is registered on `src/js/index.js`. I take the liberty to set the header `Accept` with `application/json` for you. You can get a clean instance from the service or just remove the lines that configure the onStart callback and you'll be fine :)


## Routes and pages
I've started to work with SPA's not so long ago, so I'm still discovering how to build things. Before I used React Router, but didn't like it very much. Someone recommended Director  and finally I discovered [Page.js](http://visionmedia.github.io/page.js/).

To register your app routes, go to `src/js/routes/applicationRoutes.js` file.

```js
[...]

Router.setDefaultLayout(App.components.Application);
Router.addRoute('/', App.components.pages.Home);
```

> Note that we set the instance of Router on ServicesContainter and cannot create a new one elsewhere.

Page.js is very simple. We define a path and what to do when user access it.
On applications that I did with Laravel, cake and other PHP frameworks with template engines, a recurring thing is use a layout with a view. The layout is used by multiple pages and have the common elements, like menus, footer etc. The view has specific components to that page (URL). So I've tried to create this structure here.

The component `App.components.Application` is the default layout (you can see that it have a menu). Most routes will use it. Inside it we have another component, that is the view. On the "/" path, we have the component `App.components.pages.Home`. It has specific code for that path.

So, to set the default layout you can use `Router.setDefaultLayout()`. All routes will use this layout.

Another URL can use the same layout with a different view, like this:

```js
Router.addRoute('/foo', App.components.pages.Foo);
```
In that case, the same layout will be used, but a different component will handle the "/foo" path.

Some pages are completely different, like longin pages. We can render directly the page, without a layout, for example:

```js
Router.addRoute("/login", {component: App.components.pages.Login, layout: null});
```

> Note that there's no difference between a layout and a page, both are just components. The way you use the component will define if is a layout or a view.

To create dynamic URLs you can use the `:<param>` pattern:
```js
Router.addRoute("/users/:userId", App.components.pages.User);
```

The code above will match with "/users/10", "/users/25" and so on. The value of this parameter will be passed to your component as a prop (`this.props.userId`).

You can create middlewares on the `src/js/routes/middlewares.js` file.

> Tip: the router will pass some props to your page component. The first one is `context`. Is the Page.js context object. Maybe you should avoid it, cause we can remove Page.js in the future. The second one is the all the route named parameters. We also pass all query string parameters (there's a middleware doing that, so you can disable id).

### Router experiments
When rebuilding the Router I made an experiment. Tell me what you think:

```js
Router.addRoute("/users/:userId", App.components.pages.User);
Router.addResolver("userId", (value, context, next) => {
  App.service("Users").find(value).then(user => {
    context.params.user = user;
    next();
  });
});
```

**What is happening:**
We created a route with an parameter named `userId`.
A resolver is a function that can transform and dynamic parameter in another value to pass to the page component. In the example above, we add a resolver to `userId` parameter. Every route that and parameter with this name will call this resolver before the page component (like a middleware by parameter, not route).
In this case, we use the `Users` service to fetch use data (from the backend, for example) and pass it to the page.


> Remember: this is still a work in progress.

