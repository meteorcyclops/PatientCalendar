import {observable, action} from 'mobx' 
import mobx from 'mobx' 
import _ from 'lodash' 
import moment from 'moment'

import { makeEventList } from './dealDate'
import TDialog from '../components/elements/TDialog';

class DataStore {
    @observable reservationData = []
    @observable reservationEvents = []
    @observable reservationCounter = false
    @observable getReservationsReady = true

    @observable userType = 'patient' // patient, doctor
    @observable nowDate = moment().toDate()
    @observable nowView = 'month'

    @observable pickEvent = null
    @observable infoOpen = false
    @observable modeInfoOpen = false
    @observable eventMode = false

    navagatorFun = null
    modeInfoData = {
        close: `普通模式
此模式下按右(左)鍵頭會跳至下(上)一個時間範圍(月，週，日)`,
        open: `事件模式
此模式下按右(左)鍵頭會跳至下(上)一個事件`
    }

    @action
    setObs( key, value ){
        this[key] = value
    }
    @action
    getReservations = (queryItem)=> {
        this.getReservationsReady = false
        fetch( 
            'http://localhost:8000/service', //'https://ehis.kfsyscc.org/service'
            {
                method: 'POST',
                headers: new Headers({ 
                    'Content-Type': 'application/json' 
                }),
                body: JSON.stringify(
                    Object.assign(
                        {
                            "api": "topListReservation"
                        }, 
                        queryItem
                    )
                )
            }
        )
        .then( d => d.json() )
        .then( (backdata)=>{
            if (!backdata.status){
                alert( backdata.err )
            }else {
                const data = backdata.data

                this.reservationData = data
                
                const pocessingData = makeEventList(data)
                this.reservationEvents  = pocessingData.data
                this.reservationCounter = pocessingData.counter
            }
            this.getReservationsReady = true
        } )

    }
}

const dataStore = new DataStore

export default dataStore