import React from 'react'
import _ from 'lodash'
import moment  from 'moment'
import styled from 'styled-components'
import eventTypeList from '../../stores/eventTypeList'

const EventWrapperMonth = (props)=>{
    
    const type = props.event.type
    const thisType = eventTypeList.filter((x)=>(x.value == type)) 
    const GBcolor = thisType.length>0?thisType[0].color: 'white'

    const EventDivStyle=styled.div`
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
        font-family: 微軟正黑體;
        font-size: 12px;
        /* background: rgb(243, 239, 220); */
        /* border-radius: 5px; */
        color: #17171b;
        overflow: visible;
        margin-left: 2px;
        padding-left: 5px;
        height:20px;
        pointer-events: none;
    `

    const TitleLabel=styled.div`
        position: absolute;
        left: 0;
        height: 100%;
        width:3px;
        background: ${GBcolor};
    `

    const content = makeDayDiv(props.event)

    return(
        <EventDivStyle>
            <TitleLabel />
            <span style={{ color:'rgb(10, 67, 102)'}}>
                {content}
            </span>
        </EventDivStyle>
    )

}

const makeDayDiv=(event)=>{
    const startStr = event.allDay?'':moment( event.start ).format('HH:mm')

    const data = event.data
    console.log(event)
    switch(data.title){
        case '預約門診': 
            return `${startStr} ${data.title}(${data.DOC_NAME})${ data.MEMO? '-' + data.MEMO: '' }`
        case '預約住院': 
            return `${startStr} ${data.title}`
        case '預約手術': 
            return `${startStr} ${data.beforeOprs.length>0?data.beforeOprs[0]:''}`
        case '預約排檢': 
            return `${startStr} ${data.EXAMCNAME}`
        case '預約排檢(內視鏡)': 
            return `${startStr} ${data.ITM_NAME}`
        case '預約健檢': 
            return `${startStr} ${data.title}`
        case '預約放腫': 
            return `${startStr} ${data.ActivityNote}, ${data.ShortComment}`
    }
}



export default EventWrapperMonth