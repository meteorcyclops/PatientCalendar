import React from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash' 
import moment from 'moment'

import dataStore from '../stores/data'
import eventConstentList from '../stores/eventConstentList'

class DialogConstent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    makeConstent(data){
        const printList = eventConstentList[data.title]

        let compArray = []
        
        _.forEach(printList, (item, key)=>{
            
            let constent

            if ( Array.isArray(item.column) ){
                constent = _.map(data[item.column], (each, idx)=>{
                    return(
                        <div key={ `dc${idx}`}>
                            {each}
                        </div>
                    )
                })
            }
            else if (item.column == 'date'){
                constent = (
                    <div >
                        {moment( (data.date) + (data.time || '0000'), 'YYYYMMDDHHmm').format('YYYY/MM/DD HH:mm')}
                    </div>
                )
            }
            else{
                constent = (
                    <div >
                        {data[item.column]}
                    </div>
                )
            }
            
            let comp = (
                <div key = {key} style={{marginBottom:'20px'}}>
                    <div>
                        {item.label}:
                    </div>
                    <div>
                        {constent}
                    </div>
                </div>
            )

            compArray.push(comp)
        })
        return compArray
    }

    render() {
        const data = dataStore.pickEvent
        if(!data){
            return <div></div>
        }
        const Constent = this.makeConstent(data)
        return (
            <div style={{color:'white' }}>
                <div style={{marginBottom:'20px'}}>
                    {data.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {Constent}
                </div>
            </div>
        )
    }
}

export default observer(DialogConstent)