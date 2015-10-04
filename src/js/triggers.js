var App = require("app");
var React = App.libs.React;

var elements = document.querySelectorAll("[data-render-component]");
var i = 0,elength = elements.length;

for (i = 0; i < elength; i++) {
    mountComponent(elements[i]);
}

function mountComponent(element) {
    "use strict";

    var componentName = element.getAttribute("data-render-component");
    var Component = App.helpers.object.getFlattened(componentName, App.components);
    var props = getProps(element);

    if (Component === null) {
        if (App.Config.get("debug")) {
            console.log("Component not found: " + componentName);
        }
    } else {
        React.render(
            React.createElement(Component, props),
            element
        );
    }
}

function getProps(element) {
    "use strict";

    var rawAttributes = element.attributes,
        rlength = rawAttributes.length,
        i = 0,
        props = {};

    for (i = 0; i < rlength; i++) {
        if (rawAttributes[i].name.substr(0, 10) === "data-prop-") {
            props[rawAttributes[i].name.substr(10)] = rawAttributes[i].value;
        }
    }

    return props;
}
