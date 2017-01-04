var App = require("app");
var React = App.libs.React;
var EM = App.EventManager;

var HandlingEvents = React.createClass({
    displayName: "pages.HandlingEvents",
    getInitialState: function() {
        return {
            text: "Hey, i will update in 2 seconds (Open the console)"
        };
    },
    componentDidMount: function() {
        var self = this;

        this.ListenerOneUnsubscribe = EM.subscribe(["event.one", "event.two"], this.listenerOne);
        this.ListenerTwoUnsubscribe = EM.subscribe(["event.two"], this.listenerTwo);

        window.setTimeout(function() {
            EM.notify("event.one", "Pizza", "Coke");
        }, 2000);
        window.setTimeout(function() {
            EM.notify("event.two", "8)", "(^^)");
            self.ListenerOneUnsubscribe();
            console.log("Lets unsbuscribe from event.one!");
        }, 4500);
        window.setTimeout(function() {
            EM.notify("event.one");
        }, 6000);
    },
    componentWillUnmount: function() {
        this.ListenerOneUnsubscribe();
        this.ListenerTwoUnsubscribe();
    },
    listenerOne: function(param_1, param_2) {
        console.log("Listener one: I got notified, look at my params ", param_1, param_2);
        this.setState({
            text: "And again =)"
        });
    },
    listenerTwo: function(param_1) {
        console.log("Listener two: I got notified too, look at my param ", param_1);
        this.setState({
            text: "that's it, not again =)"
        });
    },
    render: function () {
        "use strict";

        return (
            <div className="uk-grid">
                <div className="uk-width-medium-1-1">
                    {this.state.text}
                </div>
            </div>
        );
    }
});

module.exports = HandlingEvents;
