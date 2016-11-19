import App from "app";

App.helpers.date = {
    /**
     * @param {String|Integer} num add a leading 0 to help format dates and times
     * @returns {String}
     */
    leadingZero(num) {
        return `0${num}`.slice(-2);
    },

    /**
     * Receive a number of seconds and return an string representing the amount of
     * hours on the format: 00h00m00s
     * Examples:
     * beautifySeconds(60, false) => 01m
     * beautifyMinutes(120, false) => 02m
     * beautifyMinutes(3900, false) => 1h05m
     * beautifyMinutes(3900, true) => 1h05m00s
     * @param {Number} seconds
     * @param {Boolean} showSeconds
     * @returns {string}
     */
    beautifySeconds(seconds, showSeconds = true) {
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
     * @see beautifySeconds
     * Works the same way as beautifySeconds, but receibe an amount of minutes
     * @param {Number} minutes
     * @param {Boolean} showSeconds
     * @returns {String}
     */
    beautifyMinutes: (minutes, showSeconds = true) => this.beautifySeconds(minutes * 60, showSeconds),

    
    /**
     * Receives an duration with the format 00h00m00s and returns the amount 
     * of seconds. The inverse of beautifySeconds
     * 
     * @param {String} theTime
     * @returns {Number}
     */
    fromBeutyToSeconds(theTime) {
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

    
    /**
     * Receive two dates and returns the amount of days between them
     * Dates on the format supported by the Date constructor
     * 
     * @param {String} startDateString
     * @param {String} endDateString
     * @returns {Number}
     */
    daysBetween(startDateString, endDateString) {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        return Math.round(
            Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
        );
    },

    /**
     * Returns the current date on the format: yyyy-mm-dd
     * @returns {String}
     */
    curdate: () => new Date().toISOString().substr(0, 10),

    /**
     * Returns the first day of the current month on the format: yyyy-dd-mm
     * @returns {String}
     */
    firstDayOfTheMonth: function () {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-01`;
    },

    /**
     * Returns the last day of the month on the format: yyyy-mm-dd
     * It accepts an optional month and year to get the last day of an particular month
     * @param {String} month
     * @param {String} year
     * @returns {String}
     */
    lastDayOfTheMonth: function (month, year) {
        const today = new Date();
        const useMonth = month ? month : today.getMonth() + 1;
        const useYear = year ? year : today.getFullYear();
        const lastDay = new Date(useYear, useMonth, 0);

        return `${useYear}-${this.leadingZero(useMonth)}-${this.leadingZero(lastDay.getDate())}`;
    }
};
