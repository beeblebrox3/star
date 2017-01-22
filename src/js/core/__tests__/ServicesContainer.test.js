jest.autoMockOff();

import ServicesContainer from "../ServicesContainer";

const equals = (actual, expected) => expect(actual).toBe(expected);
const instance = new ServicesContainer();
const service = function () {
    let internalVar = "initial value";

    this.setVar = function (value) {
        internalVar = value;
    }

    this.getVar = function () {
        return internalVar;
    }
};

test("error when service is not registered", () => {
    expect(() => instance.get("undefinedService")).toThrowError("Service undefinedService not found");
});

test("share same instance with multiple calls", () => {
    instance.register("a", service);
    equals(instance.get("a").getVar(), "initial value");

    instance.get("a").setVar("x");
    equals(instance.get("a").getVar(), "x");
    equals(instance.get("a").getVar(), "x");
});

test("it's possible to get a new instance", () => {
    instance.register("b", service);
    equals(instance.get("b").getVar(), "initial value");

    instance.get("b").setVar("x");
    equals(instance.get("b").getVar(), "x");
    equals(instance.getNewInstance("b").getVar(), "initial value");
    equals(instance.get("b").getVar(), "x");
});

test("impossible to get a new instance when it is a singleton", () => {
    instance.setInstance("c", new service());
    equals(instance.get("c").getVar(), "initial value");

    expect(() => instance.getNewInstance("c")).toThrowError("Service c is an singleton, you cannot create a new instance");
});
