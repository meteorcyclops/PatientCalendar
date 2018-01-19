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
            // dayWrapper: EventWrapperDay,
            // dateCellWrapper?: ReactClass<any>,
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
                // dateHeader?: ReactClass<any>,
                event: EventWrapperMonth
            }
        }
        this.messages = {
            showMore: this.showMoreRender
        }
    }

    componentWillMount(){
    }

    
    // onSelectSlot(e){
    //     console.log('onSelectSlot', e)
    // }

    // slotPropGetter(e){
    //     console.log('slotPropGetter', e)
    //     return { className: 'eachSlotDay'}
    // }

    onSelectEvent(e){
        // console.log('onSelectEvent', e)
    }

    // eventPropGetter( event, start, end, isSelected){
    //     console.log('eventPropGetter', event)
    //     return {
    //         className: 'GG', 
    //     }
    // }

    componentDidMount(){
    }
    
    render() {
        const events = this.props.events
        return (
            <BigCalendar
                events={events}
                defaultDate={moment().toDate()}
                selectable={true}
                // onSelectSlot = {this.onSelectSlot.bind(this)}
                onSelectEvent = {this.onSelectEvent.bind(this)}
                // eventPropGetter = {this.eventPropGetter.bind(this)}
                // slotPropGetter = {this.slotPropGetter.bind(this)}
                toolbar = {true}
                components = {this.components}
                messages = {this.messages}
                timeslots={4}
                step = {15}
            />
        )
    }

    showMoreRender(props){
        // console.log(props)
        return(
            <div 
                style={{
                    display: 'flex', 
                    justifyContent: 'center',
                    
                }}>
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
    ]
}

// const Event = (props)=>{
//     console.log(props)
//     return(
//         <div>
            
//         </div>
//     )
// }

export default CalendarHome