import {Component} from 'react';

import './progress-bar.css';
import fullStar from '../../resources/icons/fullStar.png';
import emptyStar from '../../resources/icons/emptyStar.png';
import {ProgressBar} from 'react-bootstrap';

class MyProgressBar extends Component {
    render() {
        const borders = this.props.borders;
        const score = this.props.score;
        return (
            <div className='progress-bar'>
                <ProgressBar variant="warning" now={Math.min(score / borders[2] * 100, 100)}/>
                <p>score: {score}</p>
                {score >= borders[0] ? <img src={fullStar} style={{right: `${40}px`}}/> : null}
                {score >= borders[1] ? <img src={fullStar} style={{right: `${20}px`}}/> : null}
                {score >= borders[2] ? <img src={fullStar} style={{right: `${0}px`}}/> : null}
            </div>
        )
    }
}

export default MyProgressBar;