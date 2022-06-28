//import moment from "moment";

export const prettyHoursMinutes = ($minutes) => {
    return Math.floor($minutes / 60) + " Hours " + ($minutes % 60) + " Minutes";
};

export const dateTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date();

    return tomorrow.setDate(today.getDate() + 1);
};
