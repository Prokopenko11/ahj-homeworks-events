export default class MonsterGame {
  constructor() {
    this.board = document.querySelector('.board');
    this.cells = document.querySelectorAll('.cell');
    this.previousPosition = -1;
    this.interval = null;

    this.pointsNumber = document.querySelector('.points-number');
    this.mistakesNumber = document.querySelector('.mistakes-number');

    this.points = 0;
    this.mistakes = 0;

    this.button = document.querySelector('.new-game-button');
    this.onCellClick = this.onCellClick.bind(this);
    this.buttonOnClick = this.buttonOnClick.bind(this);

    this.button.addEventListener('click', this.buttonOnClick);
  }

  static countCellHeight() {
    const cell = document.querySelector('.cell');
    const cellHeight = `${cell.offsetWidth}px`;

    return cellHeight;
  }

  static generatePosition(previousPosition) {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * 16);
    } while (newPosition === previousPosition);
    return newPosition;
  }

  spawnMonster() {
    const monsterElement = document.querySelector('.monster');
    if (monsterElement) {
      this.updateMistakes();
      monsterElement.remove();
    }

    const monster = document.createElement('div');
    monster.classList.add('monster');
    monster.style.height = MonsterGame.countCellHeight();

    const index = MonsterGame.generatePosition(this.previousPosition);
    this.cells[index].appendChild(monster);

    this.cells[index].addEventListener('click', this.onCellClick);

    setTimeout(() => {
      if (this.cells[index].contains(monster)) {
        this.updateMistakes();
        monster.remove();
      }
    }, 1000);

    this.previousPosition = index;
  }

  onCellClick(event) {
    const clickedCell = event.currentTarget;
    const monster = clickedCell.querySelector('.monster');

    if (monster) {
      this.updatePoints();
      monster.remove();
    }
  }

  updatePoints() {
    this.points += 1;
    this.pointsNumber.textContent = this.points;
    if (this.points === 10) {
      this.stopGame();
      alert('Победа!');
    }
  }

  updateMistakes() {
    this.mistakes += 1;
    this.mistakesNumber.textContent = this.mistakes;
    if (this.mistakes === 5) {
      this.stopGame();
      alert('Вы проиграли!');
    }
  }

  buttonOnClick() {
    this.resetGame();
    this.startGame();
  }

  resetGame() {
    this.points = 0;
    this.mistakes = 0;
    this.pointsNumber.textContent = this.points;
    this.mistakesNumber.textContent = this.mistakes;
    this.stopGame();
  }

  startGame(interval = 1000) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => this.spawnMonster(), interval);
  }

  stopGame() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
