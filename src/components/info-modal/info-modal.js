import Modal from 'react-bootstrap/Modal';
import { Component } from "react";

class InfoModal extends Component {

    render() {
        return (
            <Modal
                    {...this.props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Speech recognition simulator. <br/>
                        Listen and write it down.
                    </p>
                    <p>
                        Written by <a href="https://t.me/iliamikado" target="_blank" rel="noreferrer">iliamikado</a>
                    </p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default InfoModal;