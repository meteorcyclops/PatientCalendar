import React from 'react' 
import _ from 'lodash'
import styled from 'styled-components'

import CheckIcon from '../pictures/heart-checkup.svg'

const iconColor = (tag, active=true) => {
    switch (tag) {
        case 'all':
            return active == true ? '#a0a0a0' : '#DDDDDD'
            break
        case 'inp':
            return active == true ? '#6ed3cf' : '#DDDDDD'
            break
        case 'opd':
            return active == true ? '#bbcbdd' : '#DDDDDD'
            break
        case 'emr':
            return active == true ? '#ff0000' : '#DDDDDD'
            break
        case 'surg':
            return active == true ? '#57a0eb' : '#DDDDDD'
            break
        case 'chemo':
            return active == true ? '#ae90d0' : '#DDDDDD'
            break
        case 'radio':
            return active == true ? '#ffc0cb' : '#DDDDDD'
            break
        case 'health':
            return active == true ? '#00782e' : '#DDDDDD'
            break
        case 'others':
            return active == true ? 'rgba(171, 103, 0, 0.92)' : '#DDDDDD'
            break
    }
}

const EventIcons = (props)=> {
    const iconType = props.iconType

    let classN = ''

    if ( iconType == '預約門診' ){

        classN = 'emr-OPD_1'

    } else if (iconType == '預約健檢'){
    
        classN = "emr-healthCareVer1_revert_noB" 
    } else if (iconType == '預約住院'){
        
        classN = "emr-location-OPD" 
    
    } else if (iconType == '預約手術'){

        classN = "emr-health-care_note emr-surg"

    } else if (iconType == '預約排檢' || iconType == '預約排檢(內視鏡)'){
        
        classN = "emr-eye-plus"
        // return <img style={{ fontWeight:'bold', color: '#04af04' }} src={CheckIcon} />
    }
    return (
        <i 
            style={{ 
                color: props.color, 
                fontSize: props.size
            }} 
            className={classN} 
        />
    )
}

export default EventIcons