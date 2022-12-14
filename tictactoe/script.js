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
    [0, 4, 8]
];


const winningMessagePage = document.getElementById('winning-message');
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button');
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    winningMessagePage.classList.remove('show');
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = placeMark(cell, oTurn ? O_CLASS : X_CLASS);
    if (checkWin(currentClass)) {
        endGame(false);
        console.log('bruh');
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurn();
        setBoardHoverClass();
    }
    
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = `Draw!`
    } else {
        winningMessage.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    }
    return winningMessagePage.classList.add('show');
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
    return currentClass;
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
