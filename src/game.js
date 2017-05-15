// class identifiers
const identifiers = {
  grid: "grid",
  cell: "grid__cell",
  score: "score",
  moleState: "mole"
}

class Game {
  constructor(element) {
    this.element = element; // DOM element
    this.maxMoles = 9;
    this.moleLoopTime = 5000; // 5 sec loops
    this.moles = [];
    this.state = {
      score: 0,
      activeMole: []
    };
  }

  init() {
    this.renderMoleCells();
  }

  /**
   *  @method: start
   *  Instantiates Moles for game, turning on event listeners, and
   *  starts intervals for continuously triggering active moles
   */
  start() {

  }

  /**
   *  @method: renderMoles
   *  Creates mole cell elements and appends them to games's grid element
   */
  renderMoleCells() {
    const grid = this.element.getElementsByClassName(identifiers.grid);
    for (let i = 0; i < this.maxMoles; i++) {
      const moleCell = document.createElement('div');
      moleCell.className = identifiers.cell;
      grid.appendChild(moleCell);
    }
  }

  triggerActiveMole() {

  }

  onMoleWhack() {

  }

}

export default Game;
