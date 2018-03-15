import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { observer } from 'mobx-react'

import Home from './components/home'
import dataStore from './stores/data'

class RenderForcer extends React.Component {
    render() {
        return (
            <Home 
                docno = {dataStore.docno} 
                chartno = {dataStore.chartno} 
                patid = {dataStore.patid} 
            />
        )
    }
}

export default observer(RenderForcer)
