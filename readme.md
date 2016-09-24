# Star

> [Demo](http://star.luque.cc/)


## About
This project is just a place for me to think about how  organize my front-end code. I'm not suggesting you to use, but you can - and I hope you do - ask questions or make suggestions ;)

> This project is still in development, as well as this documentation.

## Tools
The main tools here are:
 - [React](http://facebook.github.io/react/);
 - [Gulp](http://gulpjs.com/);
 - [Browserify](http://browserify.org/).

## Install
@todo install -g babel-core

## How the code is organized
### Namespaces
A good design principle is maintain a single global variable, so we have `App`.
Inside it we put all libraries, components etc.
We have something like:
```javascript
// /index.js
var App = {
	helpers: {},
	libs: {},
	components: {},
	services: {}
};
```

#### libs
Libraries like [jQuery](http://jquery.com/), [moment](http://momentjs.com/) or [React](https://facebook.github.io/react/) are placed into `App.libs` namespace:

```javascript
var App = require("app");

App.libs.React = require("react");
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

#### helpers
We wrote a lot of functions that are used in multiple places and a nice thing to do is keep them well organized according to it scopes. Let's see an example:

```javascript
// /helpers/object/index.js

var App = require('app');
App.helpers.object = {};

App.helpers.object.doSomething = function () {};
App.helpers.object.doSomethingElse = require('./doSomethingElse.js');
```

#### components
Here we have, of course, components. I'm using React, so it's React Components. Like this:

```jsx
// /components/homepage.jsx file
var App = require("app");
React = App.libs.React;

App.components.HomePage = React.createClass({
	render: function () {
		return <div>:)</div>;
	}
});
```

#### services
Services provide the data to the components. They can interact with the backend, local storage, cookies etc. We have a special way to get those services on our components, but we'll see this  later.

### Files and directories
Here's the `src/js` direcotry.
```
src/js
├── app.js
├── bootstrap.js
├── components
│   ├── Application.js
│   ├── base
│   │   └── index.js
│   ├── index.js
│   ├── mixins
│   │   └── index.js
│   └── pages
│       ├── Foo.js
│       ├── Home.js
│       └── index.js
├── config.js
├── core
│   ├── Config.js
│   ├── EventManager.js
│   ├── Router.js
│   └── ServicesContainer.js
├── helpers
│   ├── array
│   │   └── index.js
│   ├── index.js
│   ├── lang
│   │   ├── index.js
│   │   └── messages.js
│   ├── object
│   │   └── index.js
│   └── string
│       └── index.js
├── languages
│   └── pt
│       └── validator.js
├── routes.js
├── services
│   ├── ajax
│   │   └── Request.js
│   ├── index.js
│   ├── RestInterface.js
│   └── User.js
└── triggers.js
```

I created some patterns around here, let's see some of them.
All starts with the file `bootstrap.js`. It requires the other files and core modules.
One convention that I have is that each namespace has its own directory. Inside this directory must exists a `index.js` file, that creates the namespace and requires the other files. The namespaces can have a complex structure, with a bunch of subfolders and this pattern (and `index.js` file) can be applied to.

### Modules
This package has some modules that make this strutcture work. Let's see them:

#### Config
This module is responsible for the application's configurations. The API is very simple (inspired on [Laravel](http://laravel.com/)).

```javascript
App.Config.get("inexistent_config");
App.Config.get("inexistent_config", "default value");
App.Config.set("inexistent_config", "some value");
App.Config.get("inexistent_config");
```

The previous code shows how `Config` module works. You have just two methods: `get()` and `set()` .
On the first line, `get()` will return `null`, because there's no config with the name `inexistent_config`.
The second one will return the string "default value", because the second parameter of the `get()` method is the default value if the config doesn't exists.
On the third line we set the "some value" as value to the "inexistent_config" config.
Finally, in the fourth line we have "some value" as returned value, because we set this value for "inexistent_config".
This module is available on all components, libs, services etc, because is defined in the first lines of bootstrap.js file.
The  default configuration values can be set on the `config.js` file on root folder.


### EventManager
This module, like the name suggests, allows you to fire and observe application's events. Let's see:

```javascript
var eventHandler = function () {
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

### ServicesContainer
This module aims to be a single point to get any service from the application. It allows you to share instances from services between components, for example, without need to pass it over props (react components) or other means, but keeping the flexibility to create new instances if you need it.
Let's see some code:

```javascript
var ServiceXPTO = function () {
};
ServiceXPTO.prototype.sayHi() {
	return "Hi :D";
};

App.ServicesContainer.define("ServiceXPTO", ServiceXPTO);

App.ServicesContainer.get("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.get("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.getNewInstance("ServiceXPTO").sayHi(); // returns "Hi :D"
App.ServicesContainer.setInstance("AnotherServiceXPTO", new ServiceXPTO());
```

We use the `define()` method to register services on ServicesContainer. You can name it like you want. With `get()` method we get an instance of the service. At the first time that this method is called for get a specific service, the container will instantiates this service (` new ServiceName()`) and returns it. Next time you ask for this service, the same instance will be returned. If you need a new instance, even after call `get()` N times before, you can use the method `getNewInstance()`.
The method `setInstance()` allows you to pass to the container the instance that the `get()` method should return. If you don't register the service with the `define()` method, the getNewInstance() will not work. So consider `the setInstance()` as a way to create a [Singleton](https://pt.wikipedia.org/wiki/Singleton).

By default, we have 3 registered services. **EventManager**, **ROUTER** and **AJAX**.
The **EventManager** is not the App.EventManager, but it's constructor. Some services can have it's own internal events handlers, like the `Request`. They can use a clean instance of EventManager to not mess with the application events.
**ROUTER** is the instance of  [Director](https://github.com/flatiron/director) that I'm using for routes (more about it later).
Finally, **AJAX** is a service that I built to simplify ajax requests. I was using jQuery, but wanna to try without it (more about it later).

## AJAX
jQuery was present on 99% of the projects that I worked on, so all my ajax stuff was built with it. This project don't. I'm using [Superagent](https://github.com/visionmedia/superagent). But I want to make much easy to use it with the services, so I built a wrapper to help.
It's a registered service named `AJAX` (`App.ServicesContainer.get("AJAX")`).
Let's see an example:

```javascript
var Request = App.ServicesContainer.get("AJAX");

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

> On all callbacks, the argument `req` is the request created with Superagent and you can interact with it over there.
> This service is registered on `src/js/index.js`. I take the liberty to set the header `Accept` with `application/json` for you. You can get a clean instance from the service or just remove the lines that configure the onStart callback and you'll be fine :)


## Routes and pages
I've started to work with SPA's not so long ago, so I'm still discovering how to build things. Before I used React Router, but didn't like it very much. Someone recommended Director one time and I'm trying to use it.
There's a `routes.js`on the js root directory. We have something like:

```jsx
var App = require("app");
var Router = App.libs.Director.Router;
var React = App.libs.React;

var router = new Router({
    "/": function () {
        React.render(
            <App.components.Application>
                <App.components.pages.Home />
            </App.components.Application>,
            document.body
        );
    }
});

router.init();
App.ServicesContainer.setInstance("ROUTER", router);
```

> Note that we set the instance of Router on ServicesContainter and cannot create a new one elsewhere.

Director is very simple. We define a path and what to do when user access it.
On applications that I did with Laravel, cake and other PHP frameworks with template engines, a recurring thing is use a layout with a view. The layout is used by multiple pages and have the common elements, like menus, footer etc. The view has specific components to that page (URL). So I've tried to create this structure here.

The component `App.components.Application` is the default layout (you can see that it have a menu). Most routes will use it. Inside it we have aother component, that is the view. On the "/" path, we have the component `App.components.pages.Home`. It has specific code for that path.
Another URL can use the same layout with a different view, like this:

```jsx
var routes = {
	"/foo": function () {
		<App.components.Application>
			<App.components.pages.Foo />
		</App.components.Application>
	}
};
```
In that case, the same layout will be used, but a different component will handle the "/foo" path.

Some pages are completely different, like longin pages. We can render directly the page, without a layout, for example:

```jsx
var routes = {
	"/login": function () {
		<App.components.pages.Login />
	}
};
```

> Note that there's no difference between a layout and a page, both are just components. The way you use the component will define if is a layout or a view.

Right now I'm not quite happy with the way the routes are handled. I want something less verbose, that understands how I handle pages, but still with the flexibility that Director gives me. I'm working on it, but the previous attempts didn't look so well. But I will keep trying :)

I want to do something like:

```jsx
Router.setLayout(App.components.Application />);
Router.on("/", App.components.pages.Home);
Router.on("/foo", App.components.pages.Foo);
Router.on("/login", {
	render: App.components.pages.Login
});
```
With this code, I expect that on `/` and `/foo`, the `App.components.Application` layout will be used and each path will render `Home` and `Foo` pages respectively. On `/login` path, just `Login` will be rendered.
That way will be faster to create routes, less verbose and still flexible.

> Remember: this is still a work in progress.


--------

> Written with [StackEdit](https://stackedit.io/).
