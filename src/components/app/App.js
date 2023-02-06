import { Component } from 'react';

import NumbersInput from '../numbers-input/numbers-input';
import Timer from '../timer/timer';
import AttemptCards from '../attempt-cards/attempt-cards';
import Player from '../player/player';
import Header from '../header/header';
import FinalModal from '../final-modal/final-modal';
import SettingsModal from '../settings-modal/settings-modal';
import InfoModal from '../info-modal/info-modal';
import LeaderboardModal from '../leaderboard-modal/leaderboard-modal';
import NewLevelModal from '../new-level-modal/new-level-modal';
import MyProgressBar from '../progress-bar/progress-bar';

import { getResource, sendNewResult } from '../../service/service';


import listening from '../../resources/icons/listening.png';
import typing from '../../resources/icons/typing.png';
import replay from '../../resources/icons/replay.png';

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
      showNewLevelModal: false,
      scores: [],
      username: '',
      startLevelGame: false,
      levelsCount: 10,
      levelsResults: [],
      currentLevel: 1,
      right: 0,
      wrong: 0,
      stars: 0
    }
    this.gameStarted = false;
    this.answer = [-1, -1, -1, -1, -1];
    this.player = new Player(this.state.countOfNumbers, this.setAnswer);
    this.scoreUpdater = null;
    this.levelSettings = {
      1: {
        countOfNumbers: 3,
        gameDuratation: 19,
        mode: 'SINGLE',
        borders: [5, 10, 15]
      },
      2: {
        countOfNumbers: 3,
        gameDuratation: 24,
        mode: 'SINGLE',
        borders: [6, 12, 21]
      },
      3: {
        countOfNumbers: 4,
        gameDuratation: 23,
        mode: 'SINGLE',
        borders: [8, 14, 20]
      },
      4: {
        countOfNumbers: 4,
        gameDuratation: 20,
        mode: '10-20',
        borders: [8, 12, 28]
      },
      5: {
        countOfNumbers: 4,
        gameDuratation: 21,
        mode: 'TY',
        borders: [8, 20, 36]
      },
      6: {
        countOfNumbers: 4,
        gameDuratation: 20,
        mode: 'TEEN_AND_TY',
        borders: [8, 12, 28]
      },
      7: {
        countOfNumbers: 4,
        gameDuratation: 25,
        mode: 'DOUBLE',
        borders: [8, 16, 32]
      },
      8: {
        countOfNumbers: 5,
        gameDuratation: 30,
        mode: 'ALL',
        borders: [10, 20, 30]
      },
      9: {
        countOfNumbers: 6,
        gameDuratation: 30,
        mode: 'SINGLE',
        borders: [10, 18, 24]
      },
      10: {
        countOfNumbers: 3,
        gameDuratation: 15,
        mode: 'FUN',
        borders: [1, 2, 3]
      }
    }
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setUsername(username);
    }
    this.loadScores();
  }

  componentWillUnmount() {
    if (this.scoreUpdater) {
      clearInterval(this.scoreUpdater);
    }
  }

  setUsername = (username) => {
    localStorage.setItem('username', username);
    let names = localStorage.getItem('usedUsernames');
    if (names === null) {
      names = [];
    } else {
      names = names.split(',');
    }
    if (names.findIndex((name) => (name === username)) === -1) {
      names.push(username);
    }
    localStorage.setItem('usedUsernames', names);
    this.setState({username});
  }

  loadScores = () => {
    getResource('scores/').then(data => {
      const scores = data.map(item => {
        const score = item.levels.reduce((prev, next) => {
          if (next === null) {
            return 0;
          }
          return prev + next.score
        }, 0)
        const stars = item.levels.reduce((prev, next) => {
          if (next === null) {
            return 0;
          }
          return prev + next.stars
        }, 0)
        return {
          id: item.id,
          score,
          stars,
          level: item.levels.length - 1
        }
      });
      this.setState({scores});
    });
  }

  startGame = () => {
    this.setState({attempts: [], right: 0, wrong: 0});
    this.setState({startGame: true});
    this.gameStarted = true;
    this.player.play();
  }

  startLevelGame = () => {
    this.setState({startLevelGame: true, currentLevel: 1});
    this.setState({levelsResults: []});
    this.setMySettings(this.levelSettings[1]);
    this.startGame();
  }

  endGame = () => {
    this.gameStarted = false;
    this.setState({startGame: false});
    this.player.stop();
    window.dispatchEvent(new KeyboardEvent('keydown', {
      'key': `0`,
      'code': 'EndGame'
    }));
    this.setState({answer: []});

    setTimeout(() => {
      this.setState(state => {
        const right = state.right;
        const wrong = state.wrong;

        const borders = this.levelSettings[this.state.currentLevel].borders;
        const res = right - wrong;
        let stars = 0;
        while (stars < 3 && borders[stars] <= res) {
          stars++;
        }

        sendNewResult({
          id: this.state.username,
          level: this.state.currentLevel,
          score: res,
          stars: stars
        });

        return {stars};
      });
    }, 800);

    setTimeout(this.showNewLevelModal, 1000);
  }

  nextLevel = () => {
    if (this.state.currentLevel === this.state.levelsCount) {
      this.setState((state) => ({
        startLevelGame: false,
        right: state.levelsResults.reduce((count, res) => (count + res.right), state.right),
        wrong: state.levelsResults.reduce((count, res) => (count + res.wrong), state.wrong)
      }));
      this.showNewLevelModal(false);
      this.showFinalModal();
      return;
    }
    this.setMySettings(this.levelSettings[this.state.currentLevel + 1]);
    this.setState((state) => {
      return {
        currentLevel: state.currentLevel + 1,
        levelsResults: [...state.levelsResults, {right: state.right, wrong: state.wrong}]
      };
    });
    this.showNewLevelModal(false);
    this.startGame();
  }

  giveUp = () => {
    this.setState((state) => ({
      startLevelGame: false,
      right: state.levelsResults.reduce((count, res) => (count + res.right), state.right),
      wrong: state.levelsResults.reduce((count, res) => (count + res.wrong), state.wrong)
    }));
    this.showNewLevelModal(false);
    this.showFinalModal();
  }

  playAgain = () => {
    this.setMySettings(this.levelSettings[this.state.currentLevel]);
    this.showNewLevelModal(false);
    this.startGame();
  }

  setAnswer = (arr) => {
    this.setState({answer: arr.slice()});
  }

  checkAnswer = (arr) => {
    const mask = this.state.answer.map((number, i) => {
      if (number !== arr[i]) {
        if (arr[i] !== undefined) {
          this.setState(({wrong}) => ({wrong: wrong + 1}))
        }
        return false;
      } else {
        this.setState(({right}) => ({right: right + 1}))
        return true;
      }
    });


    this.setState(({attempts}) => {
      return {attempts: [...attempts, [arr.slice(), mask]]};
    });

    this.setAnswer([]);
    this.setState((state) => {
      if (this.gameStarted && state.currentLevel !== 10) {
        this.player.play();
      }
      return {};
    });
  }

  showFinalModal = (showFinalModal=true) => {this.setState({showFinalModal})}
  showSettingsModal = (showSettingsModal=true) => {this.setState({showSettingsModal})}
  showInfoModal = (showInfoModal=true) => {this.setState({showInfoModal})}
  showLeaderboardModal = (showLeaderboardModal=true) => {this.setState({showLeaderboardModal})}
  showNewLevelModal = (showNewLevelModal=true) => {this.setState({showNewLevelModal})}

  setMySettings = ({countOfNumbers, gameDuratation, mode}) => {
    this.setState({countOfNumbers, gameDuratation});
    this.player.setCount(countOfNumbers);
    this.player.setMode(mode);
  }

  render() {

    const attemptsCards = this.state.attempts.map((attempt, i) => {
      return <AttemptCards numbers={attempt[0]} mask={attempt[1]} key={i}/>
    });

    const title = this.state.startLevelGame ? `Level ${this.state.currentLevel}` : 'Speech & memo';

    return (
      <div className='App'>
        <Header openSettings={this.showSettingsModal} openInfo={this.showInfoModal} openLeaderboard={this.showLeaderboardModal} title={title}/>
        {this.state.startGame ? <Timer gameDuratation={this.state.gameDuratation} endGame={this.endGame}/> : null}
        {this.state.startLevelGame ? <MyProgressBar borders={this.levelSettings[this.state.currentLevel].borders} score={this.state.right - this.state.wrong}/> : null}
        {this.state.startLevelGame ? null :
              <InputName startGame={this.startGame} startLevelGame={this.startLevelGame} setUsername={this.setUsername} scores={this.state.scores} username={this.state.username}/>
        }
        {this.state.startLevelGame ? 
        <div className="game-field container">
          {this.state.startGame ? <img onClick={this.endGame} className="replay" src={replay} alt='replay'/> : null}
          {attemptsCards}
          {this.state.answer.length > 0 ?
            <NumbersInput checkAnswer={this.checkAnswer} countOfNumbers={this.state.countOfNumbers}/> : null
          }
        </div> : null}
        {this.state.startGame ? <></> : null}

        {this.state.showFinalModal ? 
          <FinalModal show={true} onHide={() => this.showFinalModal(false)} right={this.state.right} wrong={this.state.wrong} scores={this.state.scores} username={this.state.username} setUsername={this.setUsername} level={this.state.currentLevel} updateScores={this.loadScores}/>
        :null}
        {this.state.showLeaderboardModal ? 
          <LeaderboardModal show={this.state.showLeaderboardModal} onHide={() => this.showLeaderboardModal(false)} scores={this.state.scores} maxStars={Object.keys(this.levelSettings).length * 3} updateScores={this.loadScores} username={this.state.username}/>
        :null}
        <SettingsModal show={this.state.showSettingsModal} onHide={() => this.showSettingsModal(false)} setMySettings={this.setMySettings}/>
        <InfoModal show={this.state.showInfoModal} onHide={() => this.showInfoModal(false)}/>
        <NewLevelModal show={this.state.showNewLevelModal} onHide={this.giveUp} nextLevel={this.nextLevel} stars={this.state.stars} playAgain={this.playAgain} giveUp={this.giveUp} right={this.state.right} wrong={this.state.wrong}/>
        {this.state.startGame ? <Keyboard/> : null}
      </div>
    );
  }
}

class InputName extends Component {
  constructor(props) {
    super(props);
    let name = localStorage.getItem('username');
    if (name === null) {
        name = '';
    }
    this.state = {
        username: name,
        existingUsername: false,
        tooShortUsername: false
    }
  }

  startLevelGame = () => {

      this.setState({
          existingUsername: false,
          tooShortUsername: false,
      });

      if (this.state.username.length < 3) {
          this.setState({tooShortUsername: true});
          return;
      }

      let validNames = localStorage.getItem('usedUsernames');
      if (!validNames) {
          validNames = [];
      } else {
          validNames = validNames.split(',');
      }
      
      if (this.props.scores.findIndex(({id}) => (id === this.state.username)) !== -1 &&
          validNames.findIndex((name) => (name === this.state.username)) === -1) {
          this.setState({existingUsername: true});
          return;
      }

      this.props.setUsername(this.state.username);

      this.props.startLevelGame();
  }

  render() {
    return (
      <div className='input-name'>
        <div className='instruction'>
          <p><img alt="listen" src={listening} style={{marginRight: '15px'}}/> listen</p>
          <p>and type <img alt="type" src={typing} style={{marginLeft: '10px'}}/></p>
        </div>
        <p>Enter your name:</p>
        <input className='form-control'
          value={this.state.username}
          placeholder=''
          onChange={(e) => {this.setState({username: e.target.value})}}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              this.startLevelGame();
            }
          }}/>
        {this.state.existingUsername ? <div style={{'color': 'red'}}>This username already exsist</div> : null}
        {this.state.tooShortUsername ? <div style={{'color': 'red'}}>This username too short</div> : null}
        {this.state.success ? <div style={{'color': 'green'}}>Success</div> : null}
        <button className='btn btn-outline-dark' disabled={this.state.username === ''} onClick={this.startLevelGame}>Go</button>
      </div>
    )
  }
}

export default App;
