import Modal from 'react-bootstrap/Modal';
import { Component } from "react";

import './final-modal.css';

class FinalModal extends Component {

    componentDidMount() {
        this.props.updateScores();
    }

    render() {

        const scores = this.props.scores.slice();

        const index = scores.findIndex(({id}) => (id === this.props.username));

        if (index === -1) {
            scores.push({
                score: this.props.right - this.props.wrong,
                flag: true,
                id: this.props.username,
                level: this.props.level
            });
        } else {
            scores[index] = {
                ...scores[index],
                flag: true
            }
        }

        scores.sort((a, b) => (b.score - a.score));

        const rows = scores.map(({id, score, level, flag}, i) => {
            return (
                <tr key={i} className={flag ? 'table-success' : ''}>
                    <th scope="row">{i + 1}</th>
                    <td>{id}</td>
                    <td>{level}</td>
                    <td>{score}</td>
                </tr>
            )
        });

        return (
            <Modal
                    onHide={this.props.onHide}
                    show={this.props.show}
                    size="m"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Congratulations
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Your result: {this.props.right - this.props.wrong}</h4>
                    <p>
                        Right: {this.props.right} <br/>
                        Wrong: {this.props.wrong}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Level</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    {/* {!this.props.username ?
                        <InputUsername scores={this.props.scores} setUsername={this.props.setUsername} result={this.props.right - this.props.wrong}/>
                    : null} */}
                </Modal.Footer>
            </Modal>
        );
    }
}

// class InputUsername extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             sended: false,
//             existingUsername: false,
//             tooShortUsername: false,
//             success: false
//         }
//     }

//     sendResult = () => {
//         this.setState({
//             existingUsername: false,
//             tooShortUsername: false,
//             success: false
//         });

//         if (this.state.username.length < 3) {
//             this.setState({tooShortUsername: true});
//             return;
//         }
        
//         if (this.props.scores.findIndex(({name}) => (name === this.state.username)) !== -1) {
//             this.setState({existingUsername: true});
//             return;
//         }

//         this.setState({success: true});

//         this.props.setUsername(this.state.username);

//         postResource('scores', {
//             id: this.state.username,
//             name: this.state.username,
//             score: this.props.result
//         });
//         this.setState({sended: true});
//     }

//     render() {
//         return (
//             <>
//                 <p>You are not taking part in the competition at the moment. Enter a name to participate.</p>
//                 <div className='input-group'>
//                     <input className='form-control'
//                             value={this.state.username}
//                             placeholder='name'
//                             onChange={(e) => {this.setState({username: e.target.value})}}/>
//                     {!this.state.sended ?
//                     <button className='btn btn-dark'
//                             type="button"
//                             style={{"float": "right"}}
//                             onClick={this.sendResult}
//                             >save</button>
//                     :
//                     <button className='btn btn-dark' disabled>sended</button>}
//                 </div>
//                 {this.state.existingUsername ? <div style={{'color': 'red'}}>This username already exsist</div> : null}
//                 {this.state.tooShortUsername ? <div style={{'color': 'red'}}>This username too short</div> : null}
//                 {this.state.success ? <div style={{'color': 'green'}}>Success</div> : null}
//             </>
//         )
//     }
// }

export default FinalModal;