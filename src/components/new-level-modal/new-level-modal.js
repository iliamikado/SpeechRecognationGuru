import {Component} from 'react';
import { Modal } from 'react-bootstrap';


import fullStar from '../../resources/icons/fullStar.png';
import emptyStar from '../../resources/icons/emptyStar.png';
import trophy from '../../resources/icons/trophy.png';
import sad from '../../resources/icons/sad.png';
import replay from '../../resources/icons/replay.png';
import './new-level-modal.css'

class NewLevelModal extends Component {
    render() {
        const stars = this.props.stars;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {stars > 0 ? 'Congratulations' : 'Try again'}   
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='trophy'>
                    <img src={(stars > 0 ? trophy : sad)} alt='trophy'/>
                </div>
                <div className='stars'>
                    <img src={(stars > 0 ? fullStar : emptyStar)} alt='star'/>
                    <img src={(stars > 1 ? fullStar : emptyStar)} alt='star'/>
                    <img src={(stars > 2 ? fullStar : emptyStar)} alt='star'/>
                </div>
                <p className='score'>score: {this.props.right} - {this.props.wrong} = {this.props.right - this.props.wrong}</p>
                <div className='buttons'>
                    <button className='btn btn-outline-dark replay' onClick={this.props.playAgain}>
                        <img src={replay} alt='replay'/>
                    </button>
                    {stars > 0 ? 
                        <button className='btn btn-outline-dark next' onClick={this.props.nextLevel}>Next level</button>
                    : null}
                </div>
                <a className="give-up" onClick={this.props.giveUp}>Give up</a>
            </Modal.Body>
          </Modal>
        )
    }
}

export default NewLevelModal;