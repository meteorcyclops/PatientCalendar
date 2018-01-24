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
            end  : moment().add(10, 'minutes'),
            key  : 'none',
            type: '',
            data:{}
        }

        //------ 沒有時間的，當成全日事件
        if (!eachData.time){
            event.allDay = true
        }
        // 
        const eventTime = moment( (eachData.date + (eachData.time || '2300') ), 'YYYYMMDDHHmm' )
        event.title = dataStore.userType=='doctor'? eachData.patName : eachData.title
        event.start = eventTime.toDate()
        event.end   = eventTime.add(10, 'minutes').toDate()


        event.data = eachData

        if ( eachData.title == '預約門診' ){
            
            event.type = 'opd'
            conterObj.opd += 1
     
        } else if (eachData.title == '預約健檢'){
     
            event.type = 'health'
            conterObj.health += 1
     
        } else if (eachData.title == '預約住院'){
     
            event.type = 'inp'
            conterObj.inp += 1
     
        } else if (eachData.title == '預約手術'){
        
            event.type = 'opr'
            conterObj.opr += 1
        
        } else if (eachData.title == '預約排檢' || eachData.title == '預約排檢(內視鏡)'){
        
            event.type = 'check'
            event.title = eachData.EXAMCNAME
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