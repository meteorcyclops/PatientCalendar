import React from 'react'
import _ from 'lodash'
import moment  from 'moment'

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../css/global.css'
import '../css/calendarBody.scss'

import TitleToolBar from './TitleToolBar'
import EventWrapperMonth from './elements/EventWrapperMonth'
import EventWrapperDay from './elements/EventWrapperDay'
import EventWrapperHeader from './elements/EventWrapperHeader'

import dataStore from '../stores/data'

class CalendarHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        moment.locale('zh-tw')
        BigCalendar.setLocalizer( BigCalendar.momentLocalizer(moment) )
        this.components = {
            // event: Event,
            // eventWrapper: EventWrapper,
            // dayWrapper: DateCellWrapper,
            // dateCellWrapper: DateCellWrapper,
            toolbar: TitleToolBar,
            // agenda?: {
            //   date?: ReactClass<any>,
            //   time?: ReactClass<any>,
            //   event?: ReactClass<any>
            // },
            day: {
            //   header: EventWrapperDay,
              event: EventWrapperDay
            },
            week: {
            //   header: EventWrapperHeader,
              event: EventWrapperMonth
            },
            month: {
                // header?: ReactClass<any>,
                dateHeader: DateCellWrapper,
                event: EventWrapperMonth
            }
        }

        this.formats = {
            dayFormat:  'M/DD dd',
            agendaDateFormat:  'YYYY M/DD dd'
        }

        this.more=false
    }

    componentWillMount(){
        this.messages = {
            showMore: this.showMoreRender.bind(this)
        }
    }

    
    onSelectSlot(e){
        if (e.slots.length>0){
            const pickDay = e.slots[0]
            dataStore.setObs( 'nowDate', pickDay )
            if (this.more){
                dataStore.navagatorFun('day')
                this.more = false
            }
        }
    }
    onSelecting(e){
    }
    slotPropGetter(e){
        console.log('slotPropGetter', e)
        return { className: 'eachSlotDay'}
    }
    
    onSelectEvent(e){
        dataStore.setObs( 'nowDate', e.start )
        dataStore.setObs( 'pickEvent', e )
        dataStore.setObs( 'infoOpen', true )
    }

    eventPropGetter( event, start, end, isSelected){
        console.log('eventPropGetter', event)
        return {
            className: 'GG', 
        }
    }

    onNavigate(e){
    }

    moreDown(e){
        e.stopPropagation();
        this.more=true
    }

    componentDidUpdate(){
        // let allA = document.querySelectorAll('a')
        // console.log('1')
        // _.forEach(allA, (div)=>{
        //     console.log(div.onClick)
        //     div.onClick = ()=>{}
        // })
    }
    
    render() {
        const events = this.props.events
        const date = this.props.date
        const view = this.props.view

        return (
            <BigCalendar
                events={events}
                date={date}
                selectable={true}
                // onSelecting = {this.onSelecting.bind(this)}
                onSelectSlot = {this.onSelectSlot.bind(this)}
                onSelectEvent = {this.onSelectEvent.bind(this)}
                eventPropGetter = {this.eventPropGetter.bind(this)}
                slotPropGetter = {this.slotPropGetter.bind(this)}
                toolbar = {true}
                components = {this.components}
                messages = {this.messages}
                timeslots={1}
                step = {720}
                onNavigate = {this.onNavigate.bind(this)}
                longPressThreshold = {1}
                cancelable={true}
                view = {view}
                onView = {()=>{}}
                formats={this.formats}
                // selectable={true}
                // popup={true}
            />
        )
    }

    showMoreRender(props){
        return(
            <div 
                style={{
                    display: 'flex', 
                    justifyContent: 'center',
                }}
                onMouseDown={ this.moreDown.bind(this) }
                onClick={(e)=>{
                    e.stopPropagation()
                }}
            >
                +{props}
            </div>
        )
    }


}

CalendarHome.defaultProps={
    events  : [
        {
            title: 'today',
            allDay: true,
            start: moment(),
            end: moment().add(1, 'hours')
        },
    ],
    date: moment().add(1, 'days').toDate()
}

const DateCellWrapper = (props)=>{
    return(
        <div>
            <div>
            </div>
            {props.label}
        </div>
    )
}

export default CalendarHome