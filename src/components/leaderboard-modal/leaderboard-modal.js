import Modal from 'react-bootstrap/Modal';
import { Component } from "react";

import allStars from '../../resources/icons/allStars.png';

class LeaderboardModal extends Component {

    componentDidMount() {
        this.props.updateScores();
    }

    render() {

        const scores = this.props.scores.slice();
        scores.sort((a, b) => (b.score - a.score));

        const rows = scores.map(({score, id, level, stars}, i) => {
            return (
                <tr key={id} className={this.props.username === id ? 'table-success' : ''}>
                    <th scope="row">{i + 1}</th>
                    <td>{id}</td>
                    <td>{level}</td>
                    <td>{score}</td>
                    <td>{stars === this.props.maxStars ? <img alt="trophy" src={allStars} style={{width: "25px"}}/> : null}</td>
                </tr>
            )
        });

        return (
            <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
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
                                    <th scope="col">Level</th>
                                    <th scope="col">Score</th>
                                    <th scope="col"></th>
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