import { Component } from "react";

import './timer.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: props.gameDuratation * 100
        }
    }

    componentDidMount() {
        setTimeout(this.updateTimer, 1000);
    }

    updateTimer = () => {
        this.setState(({seconds}) => {
            if (seconds > 0) {
                return {seconds: seconds - 1};
            } else {
                this.props.endGame();
            }
        });
        setTimeout(this.updateTimer, 10);
    }

    render() {
        const width = this.state.seconds / this.props.gameDuratation;

        return (
            <div className="timer-card">
                <div className="time-scale" style={{"width": width + "%"}}></div>
                <p className="time">{this.state.seconds / 100}</p>
            </div>
        );
    }
}

export default Timer;