import Modal from 'react-bootstrap/Modal';
import { Component } from "react";

class LeaderboardModal extends Component {

    render() {

        const scores = this.props.scores.slice();
        scores.sort((a, b) => (b.score - a.score));

        const rows = scores.map(({name, score, id}, i) => {
            return (
                <tr key={id}>
                    <th scope="row">{i + 1}</th>
                    <td>{name}</td>
                    <td>{score}</td>
                </tr>
            )
        });

        return (
            <Modal
                    {...this.props}
                    size="m"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Leaderboard
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LeaderboardModal;