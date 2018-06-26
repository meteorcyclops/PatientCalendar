import React from 'react'
import _ from 'lodash'
import moment  from 'moment'
import styled from 'styled-components'
import eventTypeList from '../../stores/eventTypeList'

const EventWrapperMonth = (props)=>{
    
    const type = props.event.type
    const thisType = eventTypeList.filter((x)=>(x.value == type)) 
    const GBcolor = thisType.length>0?thisType[0].color: 'white'

    const TitleLabel=styled.div`
        position: absolute;
        left: 0px; bottom: 0px;
        height: 100%;
        width:3px;
        background: ${GBcolor};
    `

    let constent = null

    if(props.event.data){

        const eventData = props.event.data
        const event = props.event

        switch(props.event.data.title){
            case '預約門診': 
                constent = (
                    <React.Fragment>
                        <div> { event.title } </div>
                        <div className='smallHide'> { ` (${eventData.HDEPT_CODE})` } </div>
                    </React.Fragment>
                )
                break
            case '預約住院': 
                constent = (
                    <React.Fragment>
                        <div> { event.title } </div>
                        <div className='smallHide'> </div>
                    </React.Fragment>
                )
                break
            case '預約手術': 
                constent = (
                    <React.Fragment>
                        <div> { event.title } </div>
                    </React.Fragment>
                )
                break
            case '預約排檢': 
                constent = (
                    <React.Fragment>
                        <div className='bigHide'> { event.title } </div>
                        <div className='smallHide'>{ eventData.EXAMCNAME }</div>
                    </React.Fragment>
                )
                break
            case '預約排檢(內視鏡)': 
                constent = (
                    <React.Fragment>
                        <div className='bigHide'> { event.title } </div>
                        <div className='smallHide'>{ eventData.ITM_NAME }</div>
                    </React.Fragment>
                )
                break
            case '預約健檢': 
                constent = (
                    <React.Fragment>
                        <div> { event.title } </div>
                    </React.Fragment>
                )
                break
            case '預約放腫': 
                constent = (
                    <React.Fragment>
                        <div className='bigHide'> { event.title } </div>
                        <div className='smallHide'>{`${eventData.ActivityNote}, ${eventData.ShortComment}`}</div>
                    </React.Fragment>
                )
                break
        }
    }

    return(
        <div className='EventDivStyle'>
            <TitleLabel />
            {constent}
        </div>
    )

}



export default EventWrapperMonth