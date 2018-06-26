import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { observer } from 'mobx-react'
import Cookies from 'js-cookie'

import Home from './components/home'
import dataStore from './stores/data'
import person from './stores/person'

class RenderForcer extends React.Component {

    componentDidMount(){
        // 讀取是否有從別的入口來的資訊
        let otherEntryChartno = Cookies.get(`chartnoForPatientCalendar`) || ''
        Cookies.remove(`chartnoForPatientCalendar`)

        otherEntryChartno = '05131925'

        if (otherEntryChartno){
            // 讀預約資料
            dataStore.changeEntry('chartno', otherEntryChartno)
            // 讀病人資料
            person.getPerson('chartno', otherEntryChartno)
        }
        // ---
    }

    render() {

        let docno = null
        let chartno = null
        let patid = null

        console.log(dataStore.chartno)

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
