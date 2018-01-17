import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import _ from 'lodash'
import moment  from 'moment'

import CalendarTitle from './CalendarTitle' 
import CalendarHome  from './CalendarHome'

import dataStore from '../stores/data'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        
        this.chartno = this.props.chartno
        this.docno   = this.props.docno
        this.patid   = this.props.patid
    }

    componentWillMount(){
        let queryItem = {}
        
        queryItem.minDate = moment().format('YYYYMMDD')
        
        if (this.chartno) { queryItem.CHART_NO = this.chartno }
        if (this.patid)   { queryItem.PAT_IDNO = this.patid }
        if (this.docno)   { queryItem.DOC_NO   = this.docno }

        dataStore.getReservations( queryItem )
    }

    render() {

        const calendarEvents = toJS(dataStore.reservationEvents)

        return (
            <div className = 'home'>
                <div className = 'homeBackground' />
                <div className='homeTitle'>
                    <CalendarTitle />
                </div>
                <div className='homeActionPlane'>
                    actionPaln
                </div>
                <div className = 'calendarContainer'>
                    <CalendarHome 
                        events={ calendarEvents }
                    />
                </div>
            </div>
        )
    }
}

Home.defaultProps={
    docno  : '001965', //'001965'
    chartno: null, //'04927919'
    patid  : null
}

export default observer(Home)