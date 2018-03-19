import React from 'react' 
import {observer} from 'mobx-react' 
import _ from 'lodash' 
import '../css/inputInfo.css'

import dataStore from '../stores/data'
import personData from '../stores/person'

class EntryInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputType: 'patid'
        }
        this.changeInputType = this.changeInputType.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.keySend = this.keySend.bind(this)
        this.sendInput = this.sendInput.bind(this)
        this.inputValue = ''
    }

    changeInputType() {
        if ( this.state.inputType == 'chartno' ) {
            this.setState({
                inputType: 'patid'
            })
        }else{
            this.setState({
                inputType: 'chartno'
            })
        }
    }

    handleInput(e){
        this.inputValue = e.target.value.trim()
    }

    keySend(e){
        if(e.keyCode==13){
            this.sendInput()
        }
    }

    sendInput(){
        if( this.inputValue!= ''){
            dataStore.changeEntry(this.state.inputType, this.inputValue)
            personData.getPerson(this.state.inputType, this.inputValue)
        }
    }

    render() {

        let entryInfoTypeClass = 'entryInfoType'
        let itemClass = 'entryInfoTypeItem'
        let itemClassChartno = itemClass
        let itemClassPatid = itemClass

        if (this.state.inputType == 'chartno'){
            entryInfoTypeClass += ' entryInfoTypeDown'
            itemClassPatid += ' unActive'
        } else {
            entryInfoTypeClass += ' entryInfoTypeUp'
            itemClassChartno += ' unActive'
        }

        console.log(personData.msg)
        console.log(personData.name)

        return (
            <div className = 'entryInput'>
            <div id = 'entryMsg'>{personData.msg}</div>
                <div className = 'entryGroupItem'>
                    <div className = {entryInfoTypeClass}>
                        <div className = {itemClassPatid} onClick={this.changeInputType}>
                            身份證字號
                        </div>
                        <div className = {itemClassChartno} onClick={this.changeInputType}>
                            病歷號
                        </div>
                    </div>
                    : 
                    <input 
                        className = 'entryInfoField' 
                        type="text" 
                        onChange={this.handleInput} 
                        onKeyDown = {this.keySend}
                    />
                </div>
                <div className = 'entryInputConfirmButDiv' onClick = {this.sendInput}>
                    確認
                </div>
            </div>
        );
    }
}

export default observer(EntryInput)