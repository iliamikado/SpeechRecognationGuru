import Modal from 'react-bootstrap/Modal';
import { Component } from "react";


import './info-modal.css';

class InfoModal extends Component {
    render() {
        return (
            <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="info-modal">
                    <p>
                        Speech recognition simulator. <br/>
                        Listen and write it down.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <p>
                        Written by <a href="https://t.me/iliamikado" target="_blank" rel="noreferrer">iliamikado</a>
                    </p>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default InfoModal;