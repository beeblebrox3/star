jest.autoMockOff();

import Config from "../Config";

const equals = (actual, expected) => expect(actual).toBe(expected);
const instance = new Config();

test("Test Config", () => {
    equals(instance.get("foo"), null);
    equals(instance.get("foo", "x"), "x");
    
    instance.set("foo", 10);
    equals(instance.get("foo"), 10);
    equals(instance.get("foo", "x"), 10);
});