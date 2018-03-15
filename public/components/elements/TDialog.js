import React from 'react'
import styled, { keyframes } from 'styled-components'

class T_Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: props.open
        }

        this.fadeIn=keyframes`
            from {
                opacity: 0;
                transform: translate3d(0, -10%, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        `;

        this.backComp=styled.div`
            display: flex; flex-direction: row; align-items: center;
            position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px;
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            background-size: 4px 4px;
            z-index: 5
        `

        this.bodyComp=styled.div`
            position: relative;
            display: flex; flex-direction: row; align-items: flex-start;
            width: 70%; height: 70%;
            padding: 15px 25px 15px 25px;
            border-radius: 5px;
            font-family: arial, 微軟正黑體;
            background: white;
            overflow-y: auto;
            margin: 0 auto;
            box-shadow: 0px 2px 10px 5px #80808036;
            animation: ${this.fadeIn} .2s linear
        `
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        })
    }

    closeDialog(e) {
        if ( e.target.id == 'tao-dialog-writeNote' ) {
            this.setState({
                open: false
            })
            if (this.props.onDialogClose) {
                this.props.onDialogClose()
            }
        }
    }

    render() {
        const open = this.state.open
        const body = this.props.children

        const BackComp = this.backComp
        const BodyComp = this.bodyComp

        if (!open) {
            return <div style={{display: 'none'}}></div>
        } else {
            return (
                <BackComp 
                    id='tao-dialog-writeNote' 
                    style={this.props.backCompStyle} 
                    onClick={this.closeDialog.bind(this)}
                >
                    <BodyComp 
                        id='tao-dialog-writeNoteBody' 
                        style={this.props.bodyCompStyle}
                    >
                        {body}
                    </BodyComp>
                </BackComp>
            )
        }
    }
}

T_Dialog.defaultProps = {
    open: true,
    onDialogClose: ()=>{},
    bodyCompStyle: {},
    backCompStyle: {}
}

export default T_Dialog
