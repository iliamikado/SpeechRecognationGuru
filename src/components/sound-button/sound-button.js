import { Component } from 'react';

class SoundButton extends Component {

    play = () => {
        this.props.startGame();
    }

    render() {
        return (
            <button onClick={this.play}
                className='btn btn-outline-dark'
                style={{"margin": 12}}>
                Play
            </button>
        );
    }
}

export default SoundButton;