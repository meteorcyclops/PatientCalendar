import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import _ from 'lodash'
import moment  from 'moment'

import CalendarTitle from './CalendarTitle' 
import CalendarHome  from './CalendarHome'
import EventsOverview from './EventsOverview'
import Dialog from './elements/TDialog'
import DialogConstent from './DialogConstent'
import ModeInfoDisplay from './elements/ModeInfoDisplay'
import Loading from './elements/Loading'
import EntryInput from './EntryInput'

import dataStore from '../stores/data'
import personData from '../stores/person'
import eventTypeList from '../stores/eventTypeList'

import 'syscc-icons/src/syscc-fonts.css'
import BkImg from '../pictures/texture.png'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        
        if ( PRODUCTION_TYPE !== 'pp' ){
            personData.getUser()
        }

        this.chartno = this.props.chartno
        this.docno   = this.props.docno
        this.patid   = this.props.patid
    }

    componentWillReceiveProps(props){
        let queryItem = {}
        
        queryItem.minDate = moment().format('YYYYMMDD')
        
        let hasQuery = false
        if (props.chartno) { queryItem.CHART_NO = props.chartno; hasQuery = true }
        if (props.patid)   { queryItem.PAT_IDNO = props.patid; hasQuery = true }
        if (props.docno)   { queryItem.DOC_NO   = props.docno; hasQuery = true }

        if (hasQuery){
            dataStore.getReservations( queryItem )
        }
    }

    render() {

        const calendarEvents  = toJS(dataStore.reservationEvents)
        const calendarCounter = toJS(dataStore.reservationCounter)
        const nowDate = dataStore.nowDate

        return (
            <div className = 'home'>
                <div className = 'homeBackground' />
                <div 
                    className='homeTitle'
                    onClick={()=>{
                        if (personData.chartnoCanChange){
                            dataStore.setObs('entryOpen', true)
                        }
                    }}
                >
                    <CalendarTitle id={personData.id}  name= {personData.name} />
                </div>
                <div className='homeActionPlane'>
                    {
                        calendarCounter?
                        <EventsOverview 
                            dataTypeList = {eventTypeList}
                            conterObject = {calendarCounter}
                        />
                        :null
                    }
                </div>
                <div className = 'calendarContainer'>
                    <CalendarHome 
                        events={ calendarEvents }
                        date={nowDate}
                        view={dataStore.nowView}
                    />
                </div>
                <Dialog 
                    backCompStyle={{background:'none'}} 
                    bodyCompStyle={{
                        height:'75%',
                        backgroundImage: `url("${BkImg}")`,
                        backgroundColor: 'rgba(85, 162, 208, 1)',
                        border: '2px solid #e0e4ff',
                        maxWidth:'400px', 
                    }}
                    open={dataStore.infoOpen}
                    onDialogClose={()=>{dataStore.setObs('infoOpen', false)}}
                >
                    <DialogConstent/>
                </Dialog>
                <Dialog 
                    backCompStyle={{ background:'none'}} 
                    bodyCompStyle={{
                        height:'40%',
                        backgroundImage: `url("${BkImg}")`,
                        backgroundColor: 'rgba(85, 162, 208, 1)',
                        border: '2px solid #e0e4ff', 
                        maxWidth:'400px', 
                        maxHeight:'300px' 
                    }}
                    open={(dataStore.entryOpen && personData.chartnoCanChange)}
                    onDialogClose={()=>{dataStore.setObs('entryOpen', false)}}
                >
                    <EntryInput />
                </Dialog>
                <ModeInfoDisplay 
                    toggle={dataStore.modeInfoOpen} 
                    msg = {dataStore.modeInfoData[dataStore.eventMode?'open':'close']}
                />
                <Loading isLoading={dataStore.getReservationsLoading} />
            </div>
        )
    }
}

Home.defaultProps={
    docno  : null,//'001774', //'001965'
    chartno: null, //'05131925'
    patid  : null //'A221322835' 'G220919189'
}

export default observer(Home)