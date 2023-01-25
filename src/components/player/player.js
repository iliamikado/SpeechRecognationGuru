import sound0 from '../../sounds/en_num_0.mp3';
import sound1 from '../../sounds/en_num_01.mp3';
import sound2 from '../../sounds/en_num_02.mp3';
import sound3 from '../../sounds/en_num_03.mp3';
import sound4 from '../../sounds/en_num_04.mp3';
import sound5 from '../../sounds/en_num_05.mp3';
import sound6 from '../../sounds/en_num_06.mp3';
import sound7 from '../../sounds/en_num_07.mp3';
import sound8 from '../../sounds/en_num_08.mp3';
import sound9 from '../../sounds/en_num_09.mp3';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}   

class Player {
    constructor(countOfNumbers, setAnswer) {
        this.numSounds = [];
        this.numSounds.push(sound0);
        this.numSounds.push(sound1);
        this.numSounds.push(sound2);
        this.numSounds.push(sound3);
        this.numSounds.push(sound4);
        this.numSounds.push(sound5);
        this.numSounds.push(sound6);
        this.numSounds.push(sound7);
        this.numSounds.push(sound8);
        this.numSounds.push(sound9);
        
        this.countOfNumbers = countOfNumbers;
        this.currentSound = 0;
        this.answer = [];
        this.setAnswer = setAnswer;
        this.stopped = false;
    }

    play = () => {
        this.stopped = false;
        this.answer = [];
        this.currentSound = 0;
        this.playNext();
    }

    stop = () => {
        this.stopped = true;
    }

    setCount = (n) => {
        this.countOfNumbers = n;
    }

    playNext = () => {
        if (this.stopped) {
            return;
        }
        if (this.currentSound < this.countOfNumbers) {
            const number = getRandomInt(0, 9);
            this.answer.push(number);
            const word = new Audio(this.numSounds[number]);
            word.play();
            word.addEventListener('ended', this.playNext)
            this.currentSound++;
        } else {
            this.setAnswer(this.answer);
        }
    }
}

export default Player;