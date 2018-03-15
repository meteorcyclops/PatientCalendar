import React from 'react' 
import styled, {keyframes} from 'styled-components'

class ModeInfoDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this)
        this.isFirst= true
    }

    handleClick() {
    }

    componentWillReceiveProps(nextProps){
        if(this.props.toggle!=nextProps.toggle){
            this.isFirst= false
        }else{
            this.isFirst= true
        }
    }

    render() {
        const fadeOut = keyframes`
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        `
        const OutLine=styled.div`
            position: absolute;
            top:40%; left: 0px; right: 0px;
            width: 70%; margin: 0 auto;
            display: flex; flex-direction: row;
            justify-content: center;
            z-index:2;
            background: #01395ceb;
            color: white;
            border-radius: 10px;
            white-space:pre-line;
            min-height:60px;
            text-align:center;
            padding:10px;
            pointer-events:none;
            ${  this.isFirst?'opacity: 0;':`
                animation: .5s ${fadeOut} ease-out;
                animation-delay: 3s;
                animation-fill-mode: forwards;
                `
            }
        `
        return (
            <OutLine>
                {this.props.msg||''}
            </OutLine>
        )
    }
}

export default ModeInfoDisplay