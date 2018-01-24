import React from 'react' 
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/fontawesome-free-solid' 
import { faCalendarCheck } from '@fortawesome/fontawesome-free-regular' 
import { navigate } from 'react-big-calendar/lib/utils/constants'

import dataStore from '../stores/data'

class TitleToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
        dataStore.navagatorFun = this.view.bind(null, 'day')
    }

    handleClick() {
        console.log(this)
    }

    navigate = action => {
        return()=>{
            if(action=='preMonth'){
                dataStore.setObs('nowDate', moment(dataStore.nowDate).add(1, 'months').toDate() )
            } else if (action=='today'){
                dataStore.setObs('nowDate', moment().toDate() )
            } else if (action=='nextMonth'){
                dataStore.setObs('nowDate', moment(dataStore.nowDate).subtract(1, 'months').toDate())
            }
        }
    }
    
    view = view => {
        this.props.onViewChange(view)
    }

    render() {
        // console.log(this.props)
        const date = moment( this.props.date )
        const label = date.format( 'YYYY MMMM' )

        const view = this.props.view  // 現在的模式

        const viewNames = this.props.views

        const TitleBody = this.styles.titleBody
        const TitleDiv = this.styles.titleDiv
        const WalkDiv   = this.styles.walkDiv
        const WalkDivGroup = this.styles.walkDivGroup
        const ViewDivGroup = this.styles.viewDivGroup
        const ViewDivStamp = this.styles.viewDivStamp

        return (
            <TitleBody>
                <WalkDivGroup>
                    <WalkDiv onClick={this.navigate.bind(this)('preMonth')} >
                        <FontAwesomeIcon icon={ faAngleLeft }/>
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate.bind(this)('today')} >
                        <FontAwesomeIcon icon={ faCalendarCheck }/>
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate.bind(this)('nextMonth')} >
                        <FontAwesomeIcon icon={ faAngleRight }/>
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
                        style={{color: view=='week'?'#4079ff':null}}
                        onClick={this.view.bind(null, 'week')}
                    >
                        W
                    </ViewDivStamp>
                    <ViewDivStamp
                        style={{color: view=='day'?'#4079ff':null}}
                        onClick={this.view.bind(null, 'day')}
                    >
                        D
                    </ViewDivStamp>
                </ViewDivGroup>
            </TitleBody>
        )
    }

    styles = {
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
            &:active {
                background: #3174ad;
            }
        `,
        titleDiv:styled.div`
            color: white;
            font-size: 20px;
            font-weight: bold
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
            color: rgba(255, 255, 255, 0.6)
        `,
        viewDivStamp:styled.div`
            padding: 2px 6px
        `,

    }
}


export default TitleToolBar