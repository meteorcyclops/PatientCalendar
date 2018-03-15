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

        let name = ''
        let tail = ''

        if (this.props.type === 'doctor'){
            name = this.props.name
            tail='的病人預約'
        } else if (this.props.type === 'patient'){
            name = this.props.name
            tail='的預訂行程'
        }

        return [
            <span key='name' style = { { marginRight: '10px' } }>
                {name}
            </span>,
            <span key='text'>
                {tail}
            </span>
        ]
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
    type: 'patient', // doctor, patient
    id: '',
    name: ''
}

export default CalendarTitle