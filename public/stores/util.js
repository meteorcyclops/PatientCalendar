import moment from 'moment'

import dataStore from './data'
import {toJS} from 'mobx'

const combineDateTimeToDate=(item)=>{
    return moment( (item.date + item.time), 'YYYYMMDDHHmm' ).toDate()
}   

const findNextEventDate=()=>{
    const nowDate = dataStore.nowDate
    const eventList = toJS(dataStore.reservationEvents)
    
    let index = dataStore.nowDate
    for (let i = 0; i < eventList.length; i++) {
        const eventDate = eventList[i].start
        if ( ( nowDate < eventDate )){
            index = eventList[i].start
            break;
        } 
    }
    return index
}

const findPreEventDate=()=>{
    const nowDate = dataStore.nowDate
    const eventList = toJS(dataStore.reservationEvents).slice().reverse()

    let index = dataStore.nowDate
    for (let i = 0; i < eventList.length; i++) {
        const eventDate = eventList[i].start
        if ( ( nowDate > eventDate ) ){
            index = eventList[i].start
            break;
        } 
    }

    return index
}

export { 
    findNextEventDate,
    findPreEventDate,
    combineDateTimeToDate
}