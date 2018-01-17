import React from 'react' 
import _ from 'lodash' 

class CalendarTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    makeTitle() {
        if (this.props.type === 'doctor'){
            return [
                <span key='name' style = { { marginRight: '10px' } }>
                    {this.props.info.name}
                </span>,
                <span key='text'>
                    的病人預約
                </span>
            ]
        } else if (this.props.type === 'patient'){
            return [
                <span key='name' style = { { marginRight: '10px' } }>
                    {this.props.info.name}
                </span>,
                <span key='text'>
                    的預約
                </span>
            ]
        }
    }

    render() {
        const Fragment = React.Fragment

        const Constent = this.makeTitle()

        return (
            <Fragment>
                {Constent}
            </Fragment>
        )
    }
}

CalendarTitle.defaultProps={
    type: 'doctor', // patient
    info: {
        id: '001965',
        name: '鄧秀琴'
    }
}

export default CalendarTitle