const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;
const WINNING_COMBINATION = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 4, 8],
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

startGame();

function startGame() {
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = placeMark(cell, oTurn ? O_CLASS : X_CLASS);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    switchTurn();
    setBoardHoverClass();
}

function endGame(ifDraw) {
     
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (!oTurn) {
        return board.classList.add(X_CLASS);
    }
    return board.classList.add(O_CLASS);
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurn() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
