import React from 'react' 
import mobx from 'mobx' 
import _ from 'lodash' 
import '../../css/loading.scss'

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {

        
        return (
            <div 
                className="loadingOutter"
                style={{ display: this.props.isLoading?'':'none'}}
            >
                <div className="loadingCenterCircle">
                    <div id="loadingContainer">
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        <div className="loadingStick"></div>
                        
                        <h1 className="loadingH1">Loading...</h1>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading