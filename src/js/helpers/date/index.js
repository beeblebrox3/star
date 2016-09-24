import App from "app";

App.helpers.date = {
    leadingZero: function (num) {
        return ("0" + num).slice(-2);
    },

    /**
     * @param {Number} seconds
     * @param {Boolean} showSeconds
     * @returns {string}
     */
    beautifySeconds: function (seconds, showSeconds = true) {
        let response = "";
        let theTime = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        theTime.hours = ~~(seconds / 3600);
        theTime.minutes = ~~((seconds % 3600) / 60);
        theTime.seconds = seconds % 60;

        if (theTime.hours) {
            response += `${theTime.hours}h`;
            response += `${this.leadingZero(theTime.minutes)}m`;
            response += showSeconds ? `${this.leadingZero(theTime.seconds)}s` : "";
        } else if (theTime.minutes) {
            response += `${this.leadingZero(theTime.minutes)}m`;
            response += `${this.leadingZero(theTime.seconds)}s`;
        } else if (showSeconds) {
            response += `${this.leadingZero(theTime.seconds)}s`;
        }

        return response;
    },

    /**
     * @param {Number} minutes
     * @returns {String}
     */
    beautifyMinutes: function (minutes) {
        return this.beautifySeconds(minutes * 60);
    },

    fromBeutyToSeconds: function (theTime) {
        let response = 0;

        const hRE = /(\d+)h/;
        const mRE = /(\d+)m/;
        const sRE = /(\d+)s/;

        let hours = hRE.exec(theTime);
        let minutes = mRE.exec(theTime);
        let seconds = sRE.exec(theTime);

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
            response += parseInt(theTime, 10);
        }

        return response;
    },

    daysBetween: function (startDateString, endDateString) {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        return Math.round(
            Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
        );
    },

    curdate: () => new Date().toISOString().substr(0, 10),

    firstDayOfTheMonth: function () {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-01`;
    },

    lastDayOfTheMonth: function (month, year) {
        const today = new Date();
        const useMonth = month ? month : today.getMonth() + 1;
        const useYear = year ? year : today.getFullYear();
        const lastDay = new Date(useYear, useMonth, 0);

        return `${useYear}-${this.leadingZero(useMonth)}-${this.leadingZero(lastDay.getDate())}`;
    }
};
