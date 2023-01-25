import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NumbersInput from '../numbers-input/numbers-input';
import SoundButton from '../sound-button/sound-button';
import Timer from '../timer/timer';
import AttemptCards from '../attempt-cards/attempt-cards';
import Player from '../player/player';
import Header from '../header/header';
import FinalModal from '../final-modal/final-modal';
import SettingsModal from '../settings-modal/settings-modal';
import InfoModal from '../info-modal/info-modal';
import LeaderboardModal from '../leaderboard-modal/leaderboard-modal';

import { getResource } from '../../service/service';

import './App.css';
import Keyboard from '../keyboard/keyboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      countOfNumbers: 4,
      gameDuratation: 30,
      attempts: [],
      answer: [],
      showFinalModal: false,
      showSettingsModal: false,
      showInfoModal: false,
      showLeaderboardModal: false,
      scores: [],
      username: ''
    }
    this.answer = [-1, -1, -1, -1, -1];
    this.player = new Player(this.state.countOfNumbers, this.setAnswer);
    this.scoreUpdater = null;
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setUsername(username);
    }
    this.loadScores();
    this.scoreUpdater = setInterval(this.loadScores, 5000);
  }

  componentWillUnmount() {
    if (this.scoreUpdater) {
      clearInterval(this.scoreUpdater);
    }
  }

  setUsername = (username) => {
    localStorage.setItem('username', username);
    this.setState({username});
  }

  loadScores = () => {
    getResource('scores/').then(data => {
      this.setState({scores: data});
    });
  }

  startGame = () => {
    this.setState({attempts: []});
    this.setState({startGame: true});
    this.player.play();
  }

  endGame = () => {
    this.setState({startGame: false});
    this.player.stop();
    window.dispatchEvent(new KeyboardEvent('keydown', {
      'key': `0`,
      'code': 'EndGame'
    }));
    this.setState({answer: []});
    this.showFinalModal();
  }

  setAnswer = (arr) => {
    this.setState({answer: arr.slice()});
  }

  checkAnswer = (arr) => {
    const mask = this.state.answer.map((number, i) => {
      if (number !== arr[i]) {
        return false;
      } else {
        return true;
      }
    });


    this.setState(({attempts}) => {
      return {attempts: [...attempts, [arr.slice(), mask]]};
    });

    this.setAnswer([]);
    this.setState((state) => {
      if (state.startGame) {
        this.player.play();
      }
      return {};
    });
  }

  showFinalModal = () => {
    this.setState({showFinalModal: true});
  }

  hideFinalModal = () => {
    this.setState({showFinalModal: false});
  }

  showSettingsModal = () => {
    this.setState({showSettingsModal: true});
  }

  hideSettingsModal = () => {
    this.setState({showSettingsModal: false});
  }

  showInfoModal = () => {
    this.setState({showInfoModal: true});
  }

  hideInfoModal = () => {
    this.setState({showInfoModal: false});
  }

  showLeaderboardModal = () => {
    this.setState({showLeaderboardModal: true});
  }

  hideLeaderboardModal = () => {
    this.setState({showLeaderboardModal: false});
  }

  setMySettings = ({countOfNumbers, gameDuratation}) => {
    this.setState({countOfNumbers, gameDuratation});
    this.player.setCount(countOfNumbers);
  }

  render() {

    const attemptsCards = this.state.attempts.map((attempt, i) => {
      return <AttemptCards numbers={attempt[0]} mask={attempt[1]} key={i}/>
    });

    let right = 0;
    let wrong = 0;
    this.state.attempts.forEach((attempt) => {
      attempt[1].forEach((item, i) => {
        if (attempt[0][i] === undefined) {
          return;
        }
        if (item) {
          right++;
        } else {
          wrong++;
        }
      })
    });

    return (
      <div className='App'>
        <Header openSettings={this.showSettingsModal} openInfo={this.showInfoModal} openLeaderboard={this.showLeaderboardModal}/>
        {this.state.startGame ? null : 
          <SoundButton setAnswer={this.setAnswer}
            startGame={this.startGame}
            countOfNumbers={this.state.countOfNumbers}/>
        }
        {this.state.startGame ? <Timer gameDuratation={this.state.gameDuratation} endGame={this.endGame}/> : null}
        <div className="game-field container">
          {attemptsCards}
          {this.state.answer.length > 0 ?
            <NumbersInput checkAnswer={this.checkAnswer}
              countOfNumbers={this.state.countOfNumbers}/> : null
          }
        </div>
        {this.state.showFinalModal ? 
          <FinalModal show={true} onHide={this.hideFinalModal} right={right} wrong={wrong} scores={this.state.scores} username={this.state.username} setUsername={this.setUsername}/>
        :null}
        <SettingsModal show={this.state.showSettingsModal} onHide={this.hideSettingsModal} setMySettings={this.setMySettings}/>
        <InfoModal show={this.state.showInfoModal} onHide={this.hideInfoModal}/>
        <LeaderboardModal show={this.state.showLeaderboardModal} onHide={this.hideLeaderboardModal} scores={this.state.scores}/>
        <Keyboard/>
      </div>
    );
  }
}

export default App;
