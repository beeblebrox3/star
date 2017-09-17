jest.disableAutomock();

import Persistent from "../Persistent"

const equals = (actual, expected) => expect(actual).toBe(expected);
const c = new Persistent("test", false);

test("Test Config", () => {
    expect(c.get("foo")).toBe(undefined);
    expect(c.get("foo", "bar")).toBe("bar");
    expect(c.get("foo", () => "xpto")).toBe("xpto");
    expect(c.set("foo", 1).get("foo")).toBe(1);
    expect(c.setBucket("foo").get("foo")).toBe(undefined);
    expect(c.set("foo", "vera").get("foo")).toBe("vera");
    expect(c.setBucket("default").get("foo")).toBe(1); // last value on default bucket
});
