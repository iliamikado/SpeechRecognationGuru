import { Component } from "react";

import './header.css';
import settingsIcon from '../../resources/icons/setting.png';
import questionIcon from '../../resources/icons/question.png';
import cupIcon from '../../resources/icons/trophy.png'


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="inline-block icon-button" style={{"float": "left"}}>
                    <img src={questionIcon} alt="Info" onClick={this.props.openInfo} title="info"></img>
                </div>
                {/* <div className="inline-block icon-button" style={{"float": "left"}}>

                </div> */}
                <p className="inline-block">
                    speech & memory
                </p>
                <div className="inline-block icon-button" style={{"float": "right"}}>
                    <img src={settingsIcon} alt="Settings" onClick={this.props.openSettings} title="settings"></img>
                </div>
                <div className="inline-block icon-button" style={{"float": "right"}}>
                    <img src={cupIcon} alt="leaderboard" onClick={this.props.openLeaderboard} title="leaderboard"></img>
                </div>
            </div>
        )
    }
}

export default Header;