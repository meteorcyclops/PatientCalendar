import {observable, action} from 'mobx' 
import mobx from 'mobx' 
import _ from 'lodash' 
import moment from 'moment'

import { makeEventList } from './dealDate'
import TDialog from '../components/elements/TDialog';

class DataStore {

    @observable docno   = null //'001965'
    @observable chartno = null //'05131925'
    @observable patid   = null //'A221322835' 'G220919189'

    @observable reservationData = []
    @observable reservationEvents = []
    @observable reservationCounter = false
    @observable getReservationsLoading = false

    @observable userType = 'patient' // patient, doctor
    @observable nowDate = moment().toDate()
    @observable nowView = 'month'

    @observable pickEvent = null
    @observable infoOpen = false
    @observable entryOpen = true
    @observable modeInfoOpen = false
    @observable eventMode = false

    navagatorFun = null
    modeInfoData = {
        close: `普通模式
此模式下按右鍵頭會跳至下一個時間範圍 (月，週，日)，左箭頭反之。`,
        open: `事件模式
此模式下按右鍵頭會跳至下一個事件，左箭頭反之。`
    }

    @action
    setObs( key, value ){
        this[key] = value
    }

    @action
    changeEntry(key, value){
        this.docno = null
        this.chartno = null
        this.patid = null

        this[key] = value
    }

    @action
    getReservations = (queryItem)=> {
        this.getReservationsLoading = true
        fetch( 
            'https://ehis.kfsyscc.org/service', //'https://ehis.kfsyscc.org/service'
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
            this.getReservationsLoading = false
        } )

    }
}

const dataStore = new DataStore

export default dataStore