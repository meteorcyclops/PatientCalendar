import React  from 'react' 
import {observer} from 'mobx-react' 
import mobx   from 'mobx' 
import _      from 'lodash' 
import moment from 'moment'

import dataStore from '../../stores/data'

import '../../css/AgendaComponent.css'

class AgendaComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleClick = (data) => {
        dataStore.setObs( 'pickEvent', data )
        dataStore.setObs( 'infoOpen', true )
    }

    displayData = ( data ) => {
        
        const eventData = _.map( data, ( eachData, idx )=>{

            const startDay  = moment( eachData.start ).format('YYYY/MM/DD')
            const startTime = eachData.allDay? '     ' : moment( eachData.start ).format('HH:mm')
            
            const eventData = eachData.data

            let body = ''

            switch(eventData.title){
                case '預約門診': 
                    body = `${startDay} ${startTime} 門診 ${eventData.HDEPT_CODE} ${eventData.DOC_NAME} ${ eventData.MEMO? '-' + eventData.MEMO: '' }`
                    break
                case '預約住院': 
                    body = `${startDay} ${startTime} 住院`
                    break
                case '預約手術': 
                    body = `${startDay} ${startTime} 手術 ${eventData.beforeOprs.length > 0 ? eventData.beforeOprs[0] : ''}`
                    break
                case '預約排檢': 
                    body = `${startDay} ${startTime} ${eventData.EXAMCNAME}`
                    break
                case '預約排檢(內視鏡)': 
                    body = `${startDay} ${startTime} ${eventData.ITM_NAME}`
                    break
                case '預約健檢': 
                    body = `${startDay} ${startTime} 健檢`
                    break
                case '預約放腫': 
                    body = `${startDay} ${startTime} 放腫 ${eventData.ActivityNote}, ${eventData.ShortComment}`
                    break
            }

            return (
                <div className='AgendaComponentEvent' key ={idx} onClick = {()=>this.handleClick(eachData)}>
                    {body}
                </div>
            )
        } )

        return eventData
    }

    render() {
        const content = this.displayData( this.props.events )

        return (
            <div className = 'AgendaComponent'>
                {content}
            </div>
        )
    }
}

AgendaComponent.navigate = (date, action) => {
    return date
}
  
AgendaComponent.title = date => {
    return `All Reservation`
}

export default AgendaComponent