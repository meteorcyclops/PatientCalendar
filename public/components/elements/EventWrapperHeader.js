import React from 'react'
import _ from 'lodash'
import moment  from 'moment'
import styled from 'styled-components'

const EventWrapperHeader = (props)=>{
    
    const EventDivStyle=styled.div`
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
        font-size: 14px;
        /* background: rgb(243, 239, 220); */
        /* border-radius: 5px; */
        color: #17171b;
        overflow: hidden;
        margin-left: 2px;
        padding-left: 5px;
        height:20px;
        pointer-events: none;
    `

    let constent = null

    return(
        <EventDivStyle>
            <span>
                {'1234'}
            </span>
        </EventDivStyle>
    )

}



export default EventWrapperHeader