import _ from 'lodash' 
import moment from 'moment'

import dataStore from './data'

const makeEventList = (dataList) =>{

    const conterObj = {
        opd: 0,
        inp: 0,
        health: 0,
        opr: 0,
        check: 0
    }

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
     
            conterObj.opd += 1
     
        } else if (eachData.title == '預約健檢'){
     
            conterObj.health += 1
     
        } else if (eachData.title == '預約住院'){
     
            conterObj.inp += 1
     
        } else if (eachData.title == '預約手術'){
        
            conterObj.opr += 1
        
        } else if (eachData.title == '預約排檢' || eachData.title == '預約排檢(內視鏡)'){
        
            conterObj.check += 1
        
        }

        return event
    } )

    return {
        counter: conterObj,
        data: eventList
    }
}


export {
    makeEventList
}