import React from 'react' 
import _ from 'lodash' 

import EventIcons from './EventIcons'


class EventsOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    makeConstent(dataTypeList, conterObject){
        let consentArray = []

        _.forEach( dataTypeList, (eachData, key)=>{
            if (conterObject.hasOwnProperty(eachData.value) ) {
                if (conterObject[eachData.value] > 0){
                    const comp = (
                        <span className = 'events_overview_stamp' key={'overview' + eachData.value} >
                            <EventIcons 
                                iconType={eachData.title} 
                                color={eachData.color} 
                                size="18px" 
                            />
                            <span style={{marginLeft:'4px', fontSize:'#343331'}}> 
                                {conterObject[eachData.value]} 
                            </span> 
                        </span>
                    )
                    consentArray.push(comp)
                }
            }
        } )

        return consentArray
     }

    render() {
        
        const dataTypeList = this.props.dataTypeList
        const conterObject = this.props.conterObject

        const constent = this.makeConstent(dataTypeList, conterObject)

        return (
            <span className='events_overview'>
                {constent}
            </span>
        )
    }
}

EventsOverview.defaultProps={
    dataTypeList: [    
        {
            title: '預約門診',
            value: 'opd',
            color: 'rgb(60, 67, 74)'
        }
    ],
    conterObject: {
        opd: 1
    }
}

export default EventsOverview