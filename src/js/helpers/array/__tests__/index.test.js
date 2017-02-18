jest.autoMockOff();

import ArrayHelper from "../index";

const equals = (actual, expected) => expect(actual).toBe(expected);
const testCollection = [{a: 100}, {a: 1}, {a: 5}];

test("Test sortByObjectKey ASC", () => {
    const expected = [{a: 1}, {a: 5}, {a: 100}];
    const result = ArrayHelper.sortByObjectKey(testCollection, "a", "asc");    
    expected.map((expected, index) => equals(result[index].a, expected.a));
    expect(result.length, expected.length);
});

test("Test sortByObjectKey DESC", () => {
    const expected = [{a: 100}, {a: 5}, {a: 1}];
    const result = ArrayHelper.sortByObjectKey(testCollection, "a", "desc");
    
    expected.map((expected, index) => equals(result[index].a, expected.a));
    expect(result.length, expected.length);
});

test("Test sortByObjectKey should be default ASC", () => {
    const expected = [{a: 1}, {a: 5}, {a: 100}];
    const result = ArrayHelper.sortByObjectKey(testCollection, "a");
    
    expected.map((expected, index) => equals(result[index].a, expected.a));
    expect(result.length, expected.length);
});

test("Test filter by", () => {
    const expected = [{a: 5}, {a: 100}];
    const result = ArrayHelper.filterBy("a", [5, 100], testCollection);
    expected.map((expected, index) => equals(result[index].a, expected.a));
    expect(result.length, expected.length);
});