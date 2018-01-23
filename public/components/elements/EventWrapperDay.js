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
        font-size: 14px;
        /* background: rgb(243, 239, 220); */
        /* border-radius: 5px; */
        color: #17171b;
        overflow: visible;
        margin-left: 2px;
        padding-left: 5px;
        height:20px;
    `

    const TitleLabel=styled.div`
        position: absolute;
        left: 0;
        height: 100%;
        width:3px;
        background: ${GBcolor};
    `

    const startStr = moment( props.event.start ).format('HH:DD')

    return(
        <EventDivStyle>
            <TitleLabel />
            <span style={{height: '20px',paddingTop: '2px'}}>
                {startStr} {props.event.title}
            </span>
        </EventDivStyle>
    )

}



export default EventWrapperMonth