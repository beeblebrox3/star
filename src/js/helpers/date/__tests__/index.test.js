jest.autoMockOff();

import DateHelper from "../index";
import MockDate from "mockdate";

MockDate.set("2016-01-01T00:00:00+00:00", 0);

const equals = (actual, expected) => expect(actual).toBe(expected);

test("Test leadingZero", () => {
    equals("00", DateHelper.leadingZero(0));
    equals("00", DateHelper.leadingZero("00"));
    equals("00", DateHelper.leadingZero("000"));
    equals("01", DateHelper.leadingZero("1"));
});

test("Test beautifySeconds", () => {
    // key is number of seconds. First position is without seconds, second is with seconds
    const hash = {
        59: ["", "59s"],
        60: ["01m", "01m00s"],
        61: ["01m", "01m01s"],
        3900: ["1h05m", "1h05m00s"]
    };

    Object.keys(hash).map(function (seconds) {
        equals(hash[seconds][0], DateHelper.beautifySeconds(seconds, false));
        equals(hash[seconds][1], DateHelper.beautifySeconds(seconds, true));
    });
});

test("Test beautifyMinutes", () => {
    const hash = {
        59: ["59m", "59m00s"],
        60: ["1h00m", "1h00m00s"],
        61: ["1h01m", "1h01m00s"],
        3900: ["65h00m", "65h00m00s"],
        3905: ["65h05m", "65h05m00s"]
    };

    Object.keys(hash).map(function (minutes) {
        equals(hash[minutes][0], DateHelper.beautifyMinutes(minutes, false));
        equals(hash[minutes][1], DateHelper.beautifyMinutes(minutes, true));
    });
});

test("Test fromBeutyToSeconds", () => {
    const hash = {
        "1s": 1,
        "01s": 1,
        "59s": 59,
        "60s": 60,
        "1m": 60,
        "1m01s": 61,
        "1m1s": 61,
        "01m01s": 61,
        "1h": 3600,
        "1h0m1s": 3601
    };

    Object.keys(hash).map(function (strTime) {
        equals(hash[strTime], DateHelper.fromBeutyToSeconds(strTime));
    });
});

test("Test daysBetween", () => {
    const testData = [{
        dates: ["2016-01-01", "2016-01-01"],
        expected: 0
    }, {
        dates: ["2016-01-01", "2016-01-02"],
        expected: 1
    }, {
        dates: ["2016-02-28", "2016-03-01"],
        expected: 2
    }, {
        dates: ["2017-02-28", "2017-03-01"],
        expected: 1
    }, {
        dates: ["2016-01-01", "2015-01-01"],
        expected: 365
    }];

    testData.map(function (data) {
        equals(DateHelper.daysBetween(data.dates[0], data.dates[1]), data.expected);
    });
});

test("Test curdate", () => {
    equals(DateHelper.curdate(), "2016-01-01");
});

// test("Test firstDayOfTheMonth", () => {
//     // @todo ??
//     equals(DateHelper.firstDayOfTheMonth(), "2016-01-01");
// });

// test("Test lastDayOfTheMonth", () => {
//     // @todo ??
//     // equals(DateHelper.lastDayOfTheMonth(), "2016-01-31");
//     equals(DateHelper.lastDayOfTheMonth(2), "2016-02-29");
//     equals(DateHelper.lastDayOfTheMonth(2, 2017), "2017-02-28");
// });
