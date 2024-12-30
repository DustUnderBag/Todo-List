import { differenceInCalendarDays, isThisYear, format } from "date-fns";

export function getFormattedDate(date) {
    if( isIn7DaysFromToday(date) ) {
        return toDayInWeek(date);
    }

    return toActualDate(date);
}


function isIn7DaysFromToday(date) {
    const daysDiff = differenceInCalendarDays(date, new Date());
    console.log(`Date ${date} is ${daysDiff} from today`); 

    if(daysDiff <= 7)  return true;
       
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