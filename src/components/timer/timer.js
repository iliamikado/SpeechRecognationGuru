import { Component } from "react";

import './timer.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miliseconds: 0
        }
    }

    componentDidMount() {
        this.duratationMs = this.props.gameDuratation * 1000;
        this.startMs = new Date();
        this.updateTimer();
        this.myUpdater = setInterval(this.updateTimer, 100);
    }

    componentWillUnmount() {
        clearInterval(this.myUpdater);
    }

    updateTimer = () => {
        const passTime = new Date() - this.startMs;
        if (passTime > this.duratationMs) {
            this.props.endGame();
        }
        this.setState({miliseconds: this.duratationMs - passTime});
    }

    render() {
        const width = this.state.miliseconds / this.duratationMs * 100;

        return (
            <div className="timer-card">
                <div className="time-scale" style={{"width": width + "%"}}></div>
                <p className="time">{Math.floor(this.state.miliseconds / 10) / 100}</p>
            </div>
        );
    }
}

export default Timer;