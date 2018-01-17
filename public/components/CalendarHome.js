import React from 'react'
import _ from 'lodash'
import moment  from 'moment'

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../css/global.css'
import '../css/calendarBody.scss'

import TitleToolBar from './TitleToolBar'

import dataStore from '../stores/data'

class CalendarHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        moment.locale('zh-tw')
        BigCalendar.setLocalizer( BigCalendar.momentLocalizer(moment) )
        this.components = {
            // event?: ReactClass<any>,
            // eventWrapper?: ReactClass<any>,
            // dayWrapper?: ReactClass<any>,
            // dateCellWrapper?: ReactClass<any>,
            toolbar: TitleToolBar,
            // agenda?: {
            //   date?: ReactClass<any>,
            //   time?: ReactClass<any>,
            //   event?: ReactClass<any>
            // },
            // day?: {
            //   header?: ReactClass<any>,
            //   event?: ReactClass<any>
            // },
            // week?: {
            //   header?: ReactClass<any>,
            //   event?: ReactClass<any>
            // },
            // month?: {
            //     header?: ReactClass<any>,
            //     dateHeader?: ReactClass<any>,
            //     event?: ReactClass<any>
            // }
        }
    }

    componentWillMount(){
    }

    
    // onSelectSlot(e){
    //     console.log('onSelectSlot', e)
    // }

    onSelectEvent(e){
        console.log('onSelectEvent', e)
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
                toolbar = {true}
                components = {this.components}
            />
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

export default CalendarHome