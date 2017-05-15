/**
 *  Mole object used for tracking mole state and interactions
 */
class Mole {
  constructor(cell, index, active_identifier, whack_callback) {
    this.cell = cell;
    this.index = index;
    this.active_identifier = active_identifier;
    this.whack_callback = whack_callback;
    this.activeTime = 2500;
    this.activeTimeout;
    this.state = {
      active: false
    };
    this.setClickListener();
  }

  setClickListener() {
    this.cell.addEventListener('click', () => this._onWhack());
  }

  /**
   *  @method: toggleActive
   *  Toggles active state of mole and its cell element
   */
  toggleActive() {
    this.state.active = !this.state.active;
    this.cell.classList.toggle(this.active_identifier);
    this._toggleActiveTimeout(this.state.active);
  }

  /**
   *  @method: toggleActiveTimeout
   *  Toggles timer that will automatically toggle off the mole if untouched
   *  Will clear timer if mole if toggled off
   */
  _toggleActiveTimeout(active) {
    if (active) {
      this.activeTimeout = setTimeout(() => this.toggleActive(), this.activeTime);
    } else {
      clearTimeout(this.activeTimeout);
    }
  }

  /**
   *  @method: onWhack
   *  On click handler for cell element. If cell is active on click, will call
   *  whack_callback to notify game, and toggle active state.
   */
  _onWhack() {
    if (this.state.active) {
      this.toggleActive();
      return this.whack_callback();
    }
  }
}

export default Mole;
