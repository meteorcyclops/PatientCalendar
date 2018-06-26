import React from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash' 

class AgendaComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    static title (data){
        console.log(data)
        return '1234'
    }

    static navigate(data){
        console.log(data)
        return new Date()
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        console.log(this.props)
        return (
            <div className = 'AgendaComponent'>1234

            <style jsx>{`
                .AgendaComponent{
                    width: 100%;
                    height: 100%;
                    background: rgba(254, 254, 254, 0.7);
                    border-radius: 10px;
                }
            `}
            </style>
            </div>
        );
    }
}

AgendaComponent.navigate = (date, action) => {
    return date
}
  
AgendaComponent.title = date => {
    return `All Reservation`
}

export default AgendaComponent