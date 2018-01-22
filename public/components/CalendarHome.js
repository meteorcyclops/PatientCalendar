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
            // week?: {
            //   header?: ReactClass<any>,
            //   event?: ReactClass<any>
            // },
            month: {
                // header?: ReactClass<any>,
                dateHeader: DateCellWrapper,
                event: EventWrapperMonth
            }
        }
        this.messages = {
            showMore: this.showMoreRender
        }
    }

    componentWillMount(){
    }

    
    onSelectSlot(e){
        if (e.slots.length>0){
            const pickDay = e.slots[0]
            dataStore.setObs( 'nowDate', pickDay )
            dataStore.navagatorFun('day')
        }
        console.log('onSelectSlot', e)
    }
    onSelecting(e){
        console.log('onSelecting', e)
    }
    // slotPropGetter(e){
    //     console.log('slotPropGetter', e)
    //     return { className: 'eachSlotDay'}
    // }

    onSelectEvent(e){
        console.log('onSelectEvent', e)
        dataStore.setObs( 'nowDate', e.start )
    }

    // eventPropGetter( event, start, end, isSelected){
    //     console.log('eventPropGetter', event)
    //     return {
    //         className: 'GG', 
    //     }
    // }

    onNavigate(e){
        console.log(e)
    }

    componentDidMount(){
    }
    
    render() {
        const events = this.props.events
        const date = this.props.date

        return (
            <BigCalendar
                events={events}
                date={date}
                selectable={true}
                // onSelecting = {this.onSelecting.bind(this)}
                onSelectSlot = {this.onSelectSlot.bind(this)}
                onSelectEvent = {this.onSelectEvent.bind(this)}
                // eventPropGetter = {this.eventPropGetter.bind(this)}
                // slotPropGetter = {this.slotPropGetter.bind(this)}
                toolbar = {true}
                components = {this.components}
                messages = {this.messages}
                timeslots={4}
                step = {15}
                onNavigate = {this.onNavigate.bind(this)}
                longPressThreshold = {1}
                cancelable={true}
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