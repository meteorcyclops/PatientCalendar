import {observable, action} from 'mobx' 
import mobx from 'mobx' 
import _ from 'lodash' 
import moment from 'moment'

import { makeEventList } from './dealDate'
import TDialog from '../components/elements/TDialog';

class Person {

    @observable id= ''
    @observable name= '???'
    @observable ready= ''

    @action
    setObs( id, name ){
        this.id = id
        this.name = name
    }

    getPerson(type, id) {
        this.ready = false

        let data = {}

        const columnStr = `
                NAME
                CONTACT {
                    TEL_MOBILE
                    TEL_HOME
                    TEL_OFFICE
                    EMAIL
                }
        `

        if (type == 'chartno'){
            data = {
                query: `query ( $chartno: String!){
                    general{
                        patientInfo(chartno: $chartno){
                            ${columnStr}
                        }
                    }
                }`,
                // 前面若有宣告變數，在這邊給值
                variables: { 
                    chartno: id,
                }
            }
        } else if (type == 'patid'){
            data = {
                query: `query ( $patid: String!){
                    general{
                        patientInfo(patid: $patid){
                            ${columnStr}
                        }
                    }
                }`,
                // 前面若有宣告變數，在這邊給值
                variables: { 
                    patid: id,
                }
            }
        }

        // 這兩項 header 必帶
        var headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Accept", "application/json")
        
        const uri = `https://ehis.kfsyscc.org/ord-graph`
        
        fetch(uri, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then((response) => { return response.json() })
        .then( (backdata)=>{
            this.setObs(id, backdata.data.general.patientInfo.NAME)
        } )

    }
}

const personStore = new Person

export default personStore