import moment from 'moment'; 
import "moment/dist/locale/zh-cn"


export function _compareTimeString(a,b) {
    if (moment(a.time).isSame(b.time)) {
        return 0;
    } 
    if (moment(a.time).isAfter(b.time)) {
        return -1;
    } 
    if (moment(a.time).isBefore(b.time)) {
        return 1;
    }
    throw Error('Cannot recognize time data');
}

export function formatTimeString(timeString, formatting='MMMDo hh:mm:ss') {
    return moment(timeString).format(formatting);
}

