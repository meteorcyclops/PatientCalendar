import {observable, action} from 'mobx' 
import mobx from 'mobx' 
import _ from 'lodash' 
import moment from 'moment'

import { makeEventList } from './dealData'
import TDialog from '../components/elements/TDialog';
import dataStore from './data'

class Person {

    @observable id= ''
    @observable name= '???'
    @observable ready= true
    @observable msg= ''
    @observable empId= ''
    @observable empName= ''
    @observable empAccount= ''
    @observable chartnoCanChange = false

    @action
    setObs( key, value ){
        this[key] = value
    }

    getUser(){
        this.empId      = '004256'
        this.empAccount = 'flyingpath'
        this.empName    = '王傳道'
        this.chartnoCanChange = true
        // fetch('https://emr.kfsyscc.org/userinfo', { credentials:'include' })
        //     .then( (x)=>x.json() )
        //     .then( action(
        //         (data)=>{

        //             if ( _.get(data, ['user', 'USER_ID'] ) ){
        //                 this.empId = data.user.USER_ID 
        //                 this.empAccount = data.user.AD_ACCOUNT
        //                 this.empName = data.user.NAME_CH
        //                 if ( data.user.ROLE.top === 'user' ){
        //                     this.chartnoCanChange = true
        //                 }

        //             } else {
        //                 this.empId = 'nis' 
        //                 this.empAccount = 'nis'
        //                 this.empName = '未登入'
        //                 this.chartnoCanChange = true
        //             }

        //             const logData = {
        //                 "api"  : "writeLogToWeblog",
        //                 "user" : this.empId,
        //                 "type" : "topPatientCalendar"
        //             }
        //             fetch(
        //                 'https://ehis.kfsyscc.org/service', 
        //                 { 
        //                     credentials:'include',
        //                     body:   JSON.stringify(logData),
        //                     method: 'POST'
        //                 }
        //             )
        //         }
        //     ))
    }


    getPerson(type, id) {
        this.setObs('ready', false)
        this.setObs('msg', '')

        const get = () => {
            this.setObs('id', '05539101')
            this.setObs('name' , '王傳道')
            this.setObs('ready', true)
            dataStore.setObs('entryOpen', false)
        }

        setTimeout( get, 500 )
        

        // let data = {}

        // const columnStr = `
        //         NAME
        //         CONTACT {
        //             TEL_MOBILE
        //             TEL_HOME
        //             TEL_OFFICE
        //             EMAIL
        //         }
        // `

        // if (type == 'chartno'){
        //     data = {
        //         query: `query ( $chartno: String!){
        //             general{
        //                 patientInfo(chartno: $chartno){
        //                     ${columnStr}
        //                 }
        //             }
        //         }`,
        //         // 前面若有宣告變數，在這邊給值
        //         variables: { 
        //             chartno: id,
        //         }
        //     }
        // } else if (type == 'patid'){
        //     data = {
        //         query: `query ( $patid: String!){
        //             general{
        //                 patientInfo(patid: $patid){
        //                     ${columnStr}
        //                 }
        //             }
        //         }`,
        //         // 前面若有宣告變數，在這邊給值
        //         variables: { 
        //             patid: id,
        //         }
        //     }
        // }

        // // 這兩項 header 必帶
        // var headers = new Headers()
        // headers.append("Content-Type", "application/json")
        // headers.append("Accept", "application/json")
        
        // const uri = PRODUCTION_TYPE === 'pp' ? '/secure_api_secret/CalendarUserInfo' : `https://ehis.kfsyscc.org/ord-graph`
        
        // fetch(uri, {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(data),
        //     credentials: 'include'
        // })
        // .then((response) => { return response.json() })
        // .then( (backdata)=>{
        //     this.setObs('id', id)
        //     this.setObs('name' , backdata.data.general.patientInfo.NAME)
        //     this.setObs('ready', true)
        //     dataStore.setObs('entryOpen', false)
        // } )
        // .catch( ()=>{
        //     this.setObs('msg', '抓取資料錯誤\n請確認有此病人，確定有後聯絡資訊部')
        // } )
    }
}

const personStore = new Person

export default personStore
