import { Component } from "react";
import './attempt-cards.css';

class AttemptCards extends Component {

    render() {
        
        const {numbers, mask} = this.props;

        const cards = [];
        for (let i = 0; i < mask.length; ++i) {
            cards.push(<div className={"number-card " + (mask[i] ? 'right' : 'false')} key={i}>{numbers[i]}</div>);
        }

        return (
            <div>
                {cards}
            </div>
        );
    }
}

export default AttemptCards;