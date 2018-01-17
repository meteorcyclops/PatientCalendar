import React from 'react' 
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/fontawesome-free-solid' 
import { faCalendarCheck } from '@fortawesome/fontawesome-free-regular' 
import { navigate } from 'react-big-calendar/lib/utils/constants'

class TitleToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this)
    }

    navigate = action => {
        this.props.onNavigate(action)
    }
    
    view = view => {
        this.props.onViewChange(view)
    }

    render() {
        const date = moment( this.props.date )
        const label = date.format( 'YYYY MMMM' )
        const view = this.props.view

        const viewNames = this.props.views

        const WalkDiv   = this.styles.walkDiv
        const WalkDivGroup   = this.styles.walkDivGroup

        const TitleBody = this.styles.titleBody

        return (
            <TitleBody>
                <WalkDivGroup>
                    <WalkDiv onClick={this.navigate.bind(null, navigate.PREVIOUS)} >
                        <FontAwesomeIcon icon={ faAngleLeft }/>
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate.bind(null, navigate.TODAY)} >
                        <FontAwesomeIcon icon={ faCalendarCheck }/>
                    </WalkDiv>
                    <WalkDiv onClick={this.navigate.bind(null, navigate.NEXT)} >
                        <FontAwesomeIcon icon={ faAngleRight }/>
                    </WalkDiv>
                </WalkDivGroup>
                <div>
                    {label}
                </div>
            </TitleBody>
        )
    }
    // <WalkDiv
    //     key={name}
    //     onClick={this.view.bind(null, name)}
    // >
    // </WalkDiv>

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
        `
    }
}


export default TitleToolBar