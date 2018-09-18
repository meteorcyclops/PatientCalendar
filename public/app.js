import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { observer } from 'mobx-react'
import Cookies from 'js-cookie'
import qs from 'query-string'

import Home from './components/home'
import dataStore from './stores/data'
import person from './stores/person'

class RenderForcer extends React.Component {

    componentDidMount(){
        // 讀取是否有從別的入口來的資訊

        if ( window.location.search.length>0 ){
            const params = qs.parse(window.location.search)
            console.log(params)
            if (params.chartno){
                const chartnoQ = params.chartno
                dataStore.changeEntry('chartno', chartnoQ)
                person.getPerson('chartno', chartnoQ)
                if(params.page){
                    if( ['agenda', 'month', 'day'].indexOf(params.page) >= 0 ){
                        dataStore.setObs( 'nowView', params.page )
                    }
                }
                
            }
        }

        let otherEntryChartno = Cookies.get(`chartnoForPatientCalendar`) || ''
        Cookies.remove(`chartnoForPatientCalendar`)

        if (otherEntryChartno){
            // 讀預約資料
            dataStore.changeEntry('chartno', otherEntryChartno)
            // 讀病人資料
            person.getPerson('chartno', otherEntryChartno)
        } 
        // ---
        if (PRODUCTION_TYPE === 'pp'){
          fetch('/secure_api_web/UserInfo', { credentials: 'include' })
            .then(d => d.json())
            .then(d => {
              dataStore.changeEntry('chartno', d.user.ChartNo)
              person.getPerson('chartno', d.user.ChartNo)
            })
        }
    }

    render() {

        let docno = null
        let chartno = null
        let patid = null

        if (person.ready){
            docno   = dataStore.docno
            chartno = dataStore.chartno
            patid   = dataStore.patid
        }

        return (
            <Home 
                docno = {docno} 
                chartno = {chartno} 
                patid = {patid} 
            />
        )
    }
}

export default observer(RenderForcer)
