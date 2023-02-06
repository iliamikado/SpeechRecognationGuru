import Modal from 'react-bootstrap/Modal';
import { Component } from "react";

class SettingsModal extends Component {

    constructor(props) {
        super(props);
        this.availableCountOfNumbers = [3, 4, 5, 6, 7];
        this.availableTimers = [15, 30, 45, 60];
        this.state = {
            numbersIndex: 1,
            timerIndex: 1
        };
    }

    changeNumbersIndex = (ind) => {
        this.setState({numbersIndex: ind});
        this.setMySettings();
    }

    changeTimerIndex = (ind) => {
        this.setState({timerIndex: ind});
        this.setMySettings();
    }

    setMySettings = () => {
        this.setState((state) => {
            this.props.setMySettings({
                countOfNumbers: this.availableCountOfNumbers[state.numbersIndex],
                gameDuratation: this.availableTimers[state.timerIndex]
            });
        });
    }

    render() {

        const countOfNumbers = this.availableCountOfNumbers.map((count, i) => {
            return (
                <button type="button"
                    className={"btn " + (this.state.numbersIndex === i  ? "btn-dark" : "btn-outline-dark")}
                    key={i}
                    onClick={() => this.changeNumbersIndex(i)}>
                        {count}
                </button>
            )
        });

        const timers = this.availableTimers.map((time, i) => {
            return (
                <button type="button"
                    className={"btn " + (this.state.timerIndex === i  ? "btn-dark" : "btn-outline-dark")}
                    key={i}
                    onClick={() => this.changeTimerIndex(i)}>
                        {time}
                </button>
            )
        });

        return (
            <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p style={{"display": "inline-block"}}>Numbers</p>
                        <div className="btn-group"
                            role="group"
                            aria-label="Basic example"
                            style={{"float": "right"}}>
                            {countOfNumbers}
                        </div>
                    </div>
                    <div>
                        <p style={{"display": "inline-block"}}>Seconds</p>
                        <div className="btn-group"
                            role="group"
                            aria-label="Basic example"
                            style={{"float": "right"}}>
                            {timers}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SettingsModal;