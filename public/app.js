import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { observer } from 'mobx-react'

import Home from './components/home'
import dataStore from './stores/data'
import person from './stores/person'

class RenderForcer extends React.Component {



    render() {

        let docno = null
        let chartno = null
        let patid = null

        if (person.ready){
            docno = dataStore.docno
            chartno = dataStore.chartno
            patid = dataStore.patid
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
