import { differenceInCalendarDays, isThisYear, format, isTomorrow, isToday } from "date-fns";

export function getFormattedDate(date) {
    if( isToday(date) ) return "Today";
    if( isTomorrow(date) ) return "Tomorrow";

    if( isIn7DaysFromToday(date) ) {
        return toDayInWeek(date);
    }

    return toActualDate(date);
}


function isIn7DaysFromToday(date) {
    const daysDiff = differenceInCalendarDays(date, new Date());

    if(daysDiff <= 7 && daysDiff > 0)  return true;
       
    return false;
}

function toDayInWeek(date) {
    return format(date, 'eeee');
}

function toActualDate(date) {
    if(isThisYear(date)) {
        return format(date, 'MMM d');
    }else {
        return format(date, 'MMM d yyyy');
    }
    
}