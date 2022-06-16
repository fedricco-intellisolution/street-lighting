//import moment from "moment";

export const prettyHoursMinutes = ($minutes) => {
    return Math.floor($minutes / 60) + ' Hours ' + $minutes % 60 + ' Minutes'
}