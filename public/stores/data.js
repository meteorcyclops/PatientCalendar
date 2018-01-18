import {observable, action} from 'mobx' 
import mobx from 'mobx' 
import _ from 'lodash' 

import { makeEventList } from './dealDate'

class DataStore {
    @observable reservationData = []
    @observable reservationEvents = []
    @observable reservationCounter = false
    @observable getReservationsReady = true

    @observable userType = 'doctor' // patient
    

    @action
    getReservations = (queryItem)=> {
        this.getReservationsReady = false
        fetch( 
            'http://localhost:8000/service',
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