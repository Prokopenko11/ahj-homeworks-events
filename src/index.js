import Board from './js/board';
import MonsterGame from './js/app';
import './css/style.css';

const board = new Board();
board.renderBoard();

const game = new MonsterGame();
game.startGame();
