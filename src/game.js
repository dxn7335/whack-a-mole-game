import Mole from './mole';
import './styles/main.scss';

// class identifiers
const identifiers = {
  grid: "grid",
  cell: "grid__cell",
  score: "scorebox__score",
  activeMole: "active-mole",
  countdown: "countdown__time",
  startScreen: "start",
  startMsg: "start__msg",
  startBtn: "start__btn"
}

const seconds = 20;

class Game {
  constructor(element) {
    this.element = element; // DOM element
    this.gridElem = this.element.getElementsByClassName(identifiers.grid)[0];
    this.scoreElem = this.element.getElementsByClassName(identifiers.score)[0];
    this.countdownElem = this.element.getElementsByClassName(identifiers.countdown)[0];
    this.startScreenElem = this.element.getElementsByClassName(identifiers.startScreen)[0];
    this.maxMoles = 9;
    this.moleLoopTime = 750; // .75 sec loops
    this.moleLoopInterval;
    this.moles = [];
    this.gameTime = 1000 * seconds; // 60 sec game length
    this.countDownInterval;
    this.state = {
      score: 0,
      time: seconds
    };
  }

  init() {
    this.renderMoleCells();
    this.showStartScreen();
  }

  /**
   *  @method: resetGame
   *  Reset state of the game
   */
  resetGame() {
    this.state = {
      score: 0,
      time: seconds
    };
  }

  /**
   *  @method: start
   *  Instantiates Moles for game, turning on event listeners, and
   *  starts intervals for continuously triggering active moles
   */
  start() {
    this.resetGame();
    this.hideStartScreen();
    this.moleLoopInterval = setInterval(() => this.triggerActiveMole(), this.moleLoopTime);
    this.countDownInterval = setInterval(() => this.renderCountDown(), 1000);
    this.renderScore();
    setTimeout( () => this.stop(), this.gameTime);
  }

  /**
   *  @method: stop
   *  Marks end of game, showing user their score, and stopping moles
   */
  stop() {
    clearInterval(this.moleLoopInterval);
    clearInterval(this.countDownInterval);
    this.showStartScreen(false);
  }

  showStartScreen(initial = true) {
    if (initial) {
      const startBtn = this.startScreenElem.getElementsByClassName(identifiers.startBtn)[0];
      startBtn.addEventListener('click', () => this.start());
    } else {
      const startMsg = this.startScreenElem.getElementsByClassName(identifiers.startMsg)[0];
      startMsg.innerHTML = "You scored " + this.state.score + " points";
    }
    this.startScreenElem.classList.add("show");
  }

  hideStartScreen() {
    this.startScreenElem.classList.remove("show");
  }

  /**
   *  @method: renderScore
   *  Renders User Current Score
   */
  renderScore() {
    const scoreElem = this.element.getElementsByClassName(identifiers.score)[0];
    scoreElem.innerHTML = this.state.score;
  }

  /**
   *  @method: renderCountDown
   *  Ticks down timer and shows time left in countdown
   */
  renderCountDown() {
    const countdownElem = this.element.getElementsByClassName(identifiers.countdown)[0];
    this.state.time = this.state.time - 1;
    console.log(this.state.time);
    countdownElem.innerHTML = this.state.time;
  }

  /**
   *  @method: renderMoleCells
   *  Creates mole cell elements and appends them to games's grid element
   *  Also pairs mole element with a mole obj used for tracking
   */
  renderMoleCells() {
    for (let i = 0; i < this.maxMoles; i++) {
      // append mole cell to grid dom element
      const moleCell = document.createElement('div');
      moleCell.className = identifiers.cell;
      this.gridElem.appendChild(moleCell);
      // create mole object for game to track
      const moleCellElem = this.gridElem.getElementsByClassName(identifiers.cell)[i];
      const mole = this.createMole(moleCellElem, i);
      this.moles.push(mole);
    }
  }

  /**
   *  @method: createMole
   *  @return: Mole object paired to a cell element used for tracking and interactions
   */
  createMole(cellElem, index) {
    return new Mole(cellElem, index, identifiers.activeMole, () => this.onMoleWhack());
  }

  /**
   *  @method: triggerActiveMole
   *  Chooses a random Mole and toggles its active state (will be called in intervals)
   */
  triggerActiveMole() {
    const i = Math.floor(Math.random() * this.moles.length);
    console.log(i, this.moles);
    this.moles[i].toggleActive();
  }

  /**
   *  @method: onMoleWhack
   *  Callback for when a mole element is successfully whacked while active
   */
  onMoleWhack() {
    this.state.score++;
    this.renderScore();
  }

}

export default Game;
