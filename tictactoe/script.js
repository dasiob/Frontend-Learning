const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true});
})

function handleClick(e) {
    const cell = e.target;
    const currentClass = placeMark(cell, oTurn ? O_CLASS : X_CLASS);

    switchTurn();
    setBoardHoverClass();
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

