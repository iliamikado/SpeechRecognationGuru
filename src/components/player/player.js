import ending from '../../sounds/ending.mp3';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}   

class Player {
    constructor(countOfNumbers, setAnswer) {
        this.numSounds = [];
        for (let i = 0; i < 100; ++i) {
            this.numSounds.push(require(`../../sounds/en_num_${i}.mp3`));
        }
        
        this.countOfNumbers = countOfNumbers;
        this.currentSound = 0;
        this.answer = [];
        this.setAnswer = setAnswer;
        this.stopped = false;
        this.mode = 'SINGLE';
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

    setMode = (mode) => {
        this.mode = mode;
    }

    playNext = () => {
        if (this.stopped) {
            return;
        }
        if (this.currentSound < this.countOfNumbers) {
            let number;
            let word;
            switch (this.mode) {
                case 'SINGLE':
                    number = getRandomInt(0, 9);
                    this.answer.push(number);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound++;
                    break;
                case '10-20':
                    number = getRandomInt(10, 20);
                    this.answer.push(Math.floor(number / 10));
                    this.answer.push(number % 10);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound += 2;
                    break;
                case 'TY':
                    number = getRandomInt(1, 9) * 10;
                    this.answer.push(Math.floor(number / 10));
                    this.answer.push(number % 10);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound += 2;
                    break;
                case 'TEEN_AND_TY':
                    number = getRandomInt(1, 9);
                    if (Math.random() > 0.5) {
                        number += 10;
                    } else {
                        number *= 10;
                    }
                    this.answer.push(Math.floor(number / 10));
                    this.answer.push(number % 10);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound += 2;
                    break;
                case 'DOUBLE':
                    number = getRandomInt(10, 99);
                    this.answer.push(Math.floor(number / 10));
                    this.answer.push(number % 10);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound += 2;
                    break;
                case 'ALL':
                    number = getRandomInt(0, 99);
                    if (this.currentSound + 2 > this.countOfNumbers) {
                        number %= 10;
                    }
                    if (number > 9) {
                        this.answer.push(Math.floor(number / 10));
                    }
                    this.answer.push(number % 10);
                    word = new Audio(this.numSounds[number]);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    if (number > 9) {
                        this.currentSound += 2;
                    } else {
                        this.currentSound += 1;
                    }
                    break;
                case 'FUN':
                    this.answer = [4, 4, 4];
                    word = new Audio(ending);
                    word.play();
                    word.addEventListener('ended', this.playNext)
                    this.currentSound += 3;
                    break;

            }
        } else {
            this.setAnswer(this.answer);
        }
    }
}

export default Player;