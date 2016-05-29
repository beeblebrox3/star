var App = require("app");

function leadingZero(num) {
    "use strict";

    return ("0" + num).slice(-2);
}

function beautifySeconds(seconds, showSeconds) {
    "use strict";

    var show = showSeconds !== undefined ? showSeconds : true;
    var response = "";
    var theTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    theTime.hours = ~~(seconds / 3600);
    theTime.minutes = ~~((seconds % 3600) / 60);
    theTime.seconds = seconds % 60;

    if (theTime.hours) {
        response += theTime.hours + "h";
        response += leadingZero(theTime.minutes) + "m";
        response += show ? (leadingZero(theTime.seconds) + "s") : "";
    } else if (theTime.minutes) {
        response += theTime.minutes + "m";
        response += leadingZero(theTime.seconds) + "s";
    } else if (show) {
        response += theTime.seconds + "s";
    }

    return response;
}

function beautifyMinutes(minutes) {
    "use strict";

    var response = beautifySeconds(minutes * 60);
    return response;
}

function fromBeutyToSeconds(date) {
    "use strict";

    var response = 0;

    var hRE = /(\d+)h/;
    var mRE = /(\d+)m/;
    var sRE = /(\d+)s/;

    var hours = hRE.exec(date);
    var minutes = mRE.exec(date);
    var seconds = sRE.exec(date);

    if (hours) {
        response += parseInt(hours[1], 10) * 3600;
    }

    if (minutes) {
        response += parseInt(minutes[1], 10) * 60;
    }

    if (seconds) {
        response += parseInt(seconds[1], 10);
    }

    if (!response) {
        response += parseInt(date, 10);
    }

    return response;
}

function daysBetween(startDateString, endDateString) {
    "use strict";

    var oneDay = 24 * 60 * 60 * 1000;
    var startDate = new Date(startDateString);
    var endDate = new Date(endDateString);

    return Math.round(
        Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    );
}

function curdate () {
    "use strict";

    return new Date().toISOString().substr(0, 10);
}

function firstDayOfTheMonth () {
    "use strict";

    var today = new Date();
    var useMonth = month ? month : today.getMonth() + 1;
    var useYear = year ? year : today.getFullYear();

    return [useYear, leadingZero(useMonth), "01"].join("-");
}

function lastDayOfTheMonth () {
    "use strict";

    var today = new Date();
    var useMonth = month ? month : today.getMonth() + 1;
    var useYear = year ? year : today.getFullYear();
    var lastDay = new Date(useYear, useMonth, 0);

    return [useYear, leadingZero(useMonth), leadingZero(lastDay.getDate())].join("-");
}

App.helpers.date = {
    leadingZero: leadingZero,
    beautifyMinutes: beautifyMinutes,
    beautifySeconds: beautifySeconds,
    fromBeutyToSeconds: fromBeutyToSeconds,
    daysBetween: daysBetween,
    curdate: curdate,
    firstDayOfTheMonth: firstDayOfTheMonth,
    lastDayOfTheMonth: lastDayOfTheMonth
};
