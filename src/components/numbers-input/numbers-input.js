import { Component } from "react";
import './number-input.css';

class NumbersInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numbers: []
        }
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Backspace') {
                this.setState(({numbers}) => {
                    if (numbers.length > 0) {
                        return {numbers: numbers.slice(0, numbers.length - 1)};
                    }
                    return {numbers};
                });
            }
            if (e.code === 'EndGame') {
                this.setState(({numbers}) => {
                    this.props.checkAnswer(numbers);
                    return {numbers: []};
                });
                return;
            }
            if (e.code.slice(0, 5) !== 'Digit') {
                return;
            }
            const n = +e.code[5];
            this.setState((data) => {
                return {
                    numbers: [...data.numbers, n]
                }
            });
            this.setState(({numbers}) => {
                if (numbers.length >= props.countOfNumbers) {
                    this.props.checkAnswer(numbers);
                    return {numbers: []};
                } else {
                    return {};
                }
            })
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }

    render() {

        const {numbers} = this.state;
        const {countOfNumbers} = this.props;

        const cards = [];
        for (let i = 0; i < countOfNumbers; ++i) {
            cards.push(<div className={"number-card"} key={i}>{numbers[i]}</div>);
        }

        return (
            <div>
                {cards}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

export default NumbersInput;