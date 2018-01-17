import _ from 'lodash' 
import moment from 'moment'

import dataStore from './data'

const makeEventList = (dataList) =>{
    const eventList = _.map( dataList, (eachData, key)=>{
        let event = {
            title: '',
            start: moment(),
            end  : moment().add(1, 'hours'),
            key  : 'none'
        }

        const eventTime = moment( (eachData.date + (eachData.time || '2300') ), 'YYYYMMDDHHmm' )
        event.title = dataStore.userType=='doctor'? eachData.patName : eachData.title
        event.start = eventTime.toDate()
        event.end   = eventTime.add(30, 'minutes').toDate()

        if ( eachData.title == '預約門診' ){
        } else if (eachData.title == '預約健檢'){
        } else if (eachData.title == '預約住院'){
        } else if (eachData.title == '預約手術'){
        } else if (eachData.title == '預約排檢' || eachData.title == '預約排檢(內視鏡)'){
        }

        return event
    } )

    return eventList
}


export {
    makeEventList
}