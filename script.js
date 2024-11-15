const PLAYER_YELLOW_CLASS = 'yellow';
const PLAYER_CYAN_CLASS = 'cyan';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isCyanTurn = false;
const scoreYellowElement = document.querySelector('.score-yellow');
const scoreCyanElement = document.querySelector('.score-cyan');

let scoreYellow = 0;
let scoreCyan = 0;

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_YELLOW_CLASS);
  boardElement.classList.remove(PLAYER_CYAN_CLASS);
  if (isCyanTurn) {
    boardElement.classList.add(PLAYER_CYAN_CLASS);
  } else {
    boardElement.classList.add(PLAYER_YELLOW_CLASS);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isCyanTurn = !isCyanTurn;
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(PLAYER_YELLOW_CLASS) || cell.classList.contains(PLAYER_CYAN_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    if (isCyanTurn) {
      scoreCyan++;
      scoreCyanElement.innerText = scoreCyan;
    } else {
      scoreYellow++;
      scoreYellowElement.innerText = scoreYellow;
    }
    winningMessageTextElement.innerText = `Player ${isCyanTurn ? "Cyan" : "Yellow"} wins!`;
  }
  winningMessageElement.classList.add('show');
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isCyanTurn ? PLAYER_CYAN_CLASS : PLAYER_YELLOW_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function startGame() {
  isCyanTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(PLAYER_YELLOW_CLASS);
    cell.classList.remove(PLAYER_CYAN_CLASS);
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

restartButton.addEventListener('click', startGame);
startGame();
