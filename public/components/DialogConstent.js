import React from 'react' 
import {observer} from 'mobx-react' 
import {toJS} from 'mobx' 
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
            
            const columnKey = item.column
            let constent

            if ( Array.isArray( toJS(data[columnKey]) ) ){
                constent = _.map(data[columnKey], (each, idx)=>{
                    // 因醫師的陣列內容是物件，只要是物件都抓 key： name
                    let value = _.isObject( each )? each.name : each 

                    return(
                        <div key={ `${key} ${idx}`}>
                            {value}
                        </div>
                    )
                })
            }
            else if (columnKey == 'date'){
                if (data.time){
                    constent = (
                        <div >
                            {moment( (data.date) + data.time, 'YYYYMMDDHHmm').format('HH:mm')}
                        </div>
                    ) 
                } else {
                    constent = (
                        <div >
                            {''}
                        </div>
                    )
                }
            }
            else{

                let columnArray = columnKey.split('.')

                let text = data[ columnArray.shift() ]

                _.forEach(columnArray, (value) =>{
                    text = text[value]
                })

                constent = (
                    <div >
                        {text}
                    </div>
                )
            }
            
            let comp = (
                <div 
                    key = {key} 
                    style={{
                        margin:'10px 0px',
                        display:'flex',
                        flexDirection:'row',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width:'85px',
                            minWidth: '85px'
                        }}
                    >
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
        if(!data.data){
            return <div></div>
        }
        const Constent = this.makeConstent(data.data)
        return (
            <div style={{color:'white' }}>
                <div style={{marginBottom:'20px'}}>
                    {`${data.title} ${data.titleTail || ''} ${ moment( data.data.date, 'YYYYMMDD').format('YYYY-MM-DD')}`}
                </div>
                <div
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        fontSize: '15px'
                    }}>
                    {Constent}
                </div>
            </div>
        )
    }
}

export default observer(DialogConstent)