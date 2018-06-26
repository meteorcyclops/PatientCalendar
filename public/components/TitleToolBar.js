import React from 'react' 
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { library }         from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'


import { navigate } from 'react-big-calendar/lib/utils/constants'

import dataStore from '../stores/data'
import { findNextEventDate, findPreEventDate } from '../stores/util'

class TitleToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
        dataStore.navagatorFun = this.view.bind(null, 'day')
        library.add(faAngleRight)
        library.add(faAngleLeft)
        library.add(faBriefcase)
        library.add(faCalendarCheck)
    }

    handleClick() {
        console.log(this)
    }

    navigate = action => {
        return()=>{
            const option = dataStore.nowView + 's'
            
            if(dataStore.eventMode){
                if(action=='pre'){
                    dataStore.setObs('nowDate', findPreEventDate() )
                } else if (action=='today'){
                    dataStore.setObs('nowDate', moment().toDate() )
                } else if (action=='next'){
                    dataStore.setObs('nowDate', findNextEventDate() )
                }
            }else{
                if(action=='pre'){
                    dataStore.setObs('nowDate', moment(dataStore.nowDate).subtract(1, option).toDate() )
                } else if (action=='today'){
                    dataStore.setObs('nowDate', moment().toDate() )
                } else if (action=='next'){
                    dataStore.setObs('nowDate', moment(dataStore.nowDate).add(1, option).toDate() )
                }
            }
        }
    }
    
    view = view => {
        dataStore.setObs('nowView', view)
    }

    render() {
        // console.log(this.props)
        const date = moment( this.props.date )
        const label = date.format( 'YYYY MMMM' )

        const view = this.props.view  // 現在的模式

        const viewNames = this.props.views

        const eventMode = dataStore.eventMode

        const comps = this.styles({eventMode})
        const TitleBody    = comps.titleBody
        const TitleDiv     = comps.titleDiv
        const WalkDiv      = comps.walkDiv
        const WalkDivGroup = comps.walkDivGroup
        const ViewDivGroup = comps.viewDivGroup
        const ViewDivStamp = comps.viewDivStamp
        const ModeControl  = comps.modeControl

        // <ViewDivStamp
        //     style={{color: view=='week'?'#4079ff':null}}
        //     onClick={this.view.bind(null, 'week')}
        // >
        //     W
        // </ViewDivStamp>

        return (
            <TitleBody>
                <WalkDivGroup>
                    <WalkDiv onClick={this.navigate('pre')} >
                        <FontAwesomeIcon icon='angle-left' />
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate('today')} >
                        <FontAwesomeIcon icon={["far",'calendar-check']} />
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate('next')} >
                        <FontAwesomeIcon icon="angle-right" />
                    </WalkDiv>
                </WalkDivGroup>
                <TitleDiv> {label} </TitleDiv>
                <ViewDivGroup>
                    <ViewDivStamp 
                        style={{color: view=='month'?'#4079ff':null}}
                        onClick={this.view.bind(null, 'month')}
                    >
                        M
                    </ViewDivStamp>
                    <ViewDivStamp
                        style={{color: view=='day'?'#4079ff':null}}
                        onClick={this.view.bind(null, 'day')}
                    >
                        D
                    </ViewDivStamp>
                    <ViewDivStamp
                        style={{color: view=='agenda'?'#4079ff':null}}
                        onClick={this.view.bind(null, 'agenda')}
                    >
                        A
                    </ViewDivStamp>
                </ViewDivGroup>
                <ModeControl 
                    onClick={()=>{
                        dataStore.setObs('eventMode', !dataStore.eventMode)
                        dataStore.setObs('modeInfoOpen', !dataStore.modeInfoOpen)
                    }}
                >
                    <FontAwesomeIcon icon={["fas",'briefcase']} />
                </ModeControl>
            </TitleBody>
        )
    }

    styles({eventMode=false}) {
        return(
        {
            titleBody:styled.div`
                position: absolute;
                top:0px; left:0px; right:0px; bottom: 0px;
                width: 100%;
                display: flex; flex-direction: row;
                justify-content: center;
            `,
            walkDivGroup:styled.div`
                position: absolute;
                right: 0px; bottom: 0px;
                display: flex; flex-direction: row;
                align-items: center;
            `,
            walkDiv:styled.div`
                padding: 3px;
                display: flex; 
                align-items: center;
                justify-content: center;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                font-size: 20px;
                color: white;
                margin: 0px 2px;
                cursor: pointer;
                &:active {
                    background: #3174ad;
                }
            `,
            titleDiv:styled.div`
                color: white;
                font-size: 20px;
                font-weight: bold;
            `,
            viewDivGroup:styled.div`
                position: absolute;
                right: 0px; top: 0px;
                display: flex; flex-direction: row;
                align-items: center;
                margin-right:10px;
                font-size: 20px;
                font-family: monospace;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.6);
            `,
            viewDivStamp:styled.div`
                padding: 2px 6px;
                cursor: pointer;
            `,
            modeControl:styled.div`
                position: absolute;
                right: 50%; bottom: 0px;
                display: flex; flex-direction: row;
                align-items: center;
                border-radius: 50%;
                font-size: 25px;
                margin: 2px;
                color: ${eventMode?'#ff2805':'#ffffff80'};
                cursor: pointer;
            `
        })
    }
}


export default observer(TitleToolBar)