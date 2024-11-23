export default class Board {
  constructor() {
    this.board = document.querySelector('.board');
  }

  renderBoard() {
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');

      cell.classList.add('cell');

      this.board.appendChild(cell);
    }
  }
}
