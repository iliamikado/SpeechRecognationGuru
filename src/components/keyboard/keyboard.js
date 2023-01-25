import { Component } from "react";

import deleteIcon from '../../resources/icons/delete.png';
import './keyboard.css';

class Keyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    onClick = (n) => {
        if (n === 'Delete') {
            window.dispatchEvent(new KeyboardEvent('keydown', {
                'key': `${n}`,
                'code': 'Backspace'
            }));
            return;
        }
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': `${n}`,
            'code': `Digit${n}`
        }));
    }

    render() {
        return (
            <div className="keyboard">
                <div>
                    <button className="my-btn" onClick={() => this.onClick(1)}>1</button>
                    <button className="my-btn" onClick={() => this.onClick(2)}>2</button>
                    <button className="my-btn" onClick={() => this.onClick(3)}>3</button>
                </div>
                <div>
                    <button className="my-btn" onClick={() => this.onClick(4)}>4</button>
                    <button className="my-btn" onClick={() => this.onClick(5)}>5</button>
                    <button className="my-btn" onClick={() => this.onClick(6)}>6</button>
                </div>
                <div>
                    <button className="my-btn" onClick={() => this.onClick(7)}>7</button>
                    <button className="my-btn" onClick={() => this.onClick(8)}>8</button>
                    <button className="my-btn" onClick={() => this.onClick(9)}>9</button> 
                </div>
                <div padding='0px'>
                    <div className="key"></div>
                    <button className="my-btn" onClick={() => this.onClick(0)}>0</button>
                    <img className="key" src={deleteIcon} alt="delete" onClick={() => this.onClick('Delete')}></img>
                </div>
            </div>
        )
    }
}

export default Keyboard;