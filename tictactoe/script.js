const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const winningMessagePage = document.getElementById('winning-message');
const board = document.getElementById('board');
const winningMessage = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button');

for (let i = 0; i < 117; i++) {
    let div = document.createElement("div");
    div.setAttribute('class', 'cell');
    div.setAttribute('data-cell', '');
    board.appendChild(div);
}

const cellElements = document.querySelectorAll('[data-cell]');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cellElements.forEach((cell, index) => {
        // cell.removeEventListener('click', cellClickHandler);
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        // cell.addEventListener('click', cellClickHandler, {once: true});
        cell.clicked = false;
        cell.onclick = (e) => {
            if (!cell.clicked) {
                handleClick(e, index);
            }
            cell.clicked = true;
        };
    });
    setBoardHoverClass();
    winningMessagePage.classList.remove('show');
}


function handleClick(e, index) {
    const cell = e.target;
    const currentClass = placeMark(cell, oTurn ? O_CLASS : X_CLASS);
    if (checkIfWin(currentClass, index)) {
        endGame(false);
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
        winningMessage.innerText = `You suck ${!oTurn ? "O" : "X"}!`
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

function checkIfWin(currentClass, index) {
    return winByRow(currentClass, index) 
    || winByCollumn(currentClass, index) 
    || winByDiagonal(currentClass, index);
}

function winByDiagonal(currentClass, index) {
    let countUpLeft = 0;
    let countDownLeft = 0;
    let countUpRight = 0;
    let countDownRight = 0;
    let blockedUpLeft = false;
    let blockedDownLeft = false;
    let blockedUpRight = false;
    let blockedDownRight = false;
    for (let i = index + 12; i < 117 && i <= index + 5 * 13 + 5; i = i + 12) {
        let previousCellIndex = i - 12;
        if (Math.floor(previousCellIndex / 13) == Math.floor(i / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedDownLeft = true;
            break;
        }

        countDownLeft++;
    }

    for (let i = index - 12; i >= 0 && i >= index - 5 * 13 + 5; i = i - 12) {
        let previousCellIndex = i + 12;
        if (Math.floor(previousCellIndex / 13) == Math.floor(i / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedUpRight = true;
            break;
        }

        countUpRight++;
    }

    for (let i = index + 14; i < 117 && i <= index + 5 * 13 + 5; i = i + 14) {
        let previousCellIndex = i - 14;
        if (Math.floor(previousCellIndex / 13) + 2 == Math.floor(i / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedDownRight = true;
            break;
        }

        countDownRight++;
    }

    for (let i = index - 14; i >= 0 && i >= index - 5 * 13 + 5; i = i - 14) {
        let previousCellIndex = i + 14;
        if (Math.floor(previousCellIndex / 13) - 2 == Math.floor(i / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedUpLeft = true;
            break;
        }

        countUpLeft++;
    }

    if (blockedDownRight && blockedUpLeft) {
        return false;
    }

    if (blockedDownLeft && blockedUpRight) {
        return false;
    } 

    if ((blockedDownRight || blockedUpLeft) && countDownRight + countUpLeft + 1 >= 5) {
        return true;
    } 
        
    if ((!(blockedDownRight || blockedUpLeft)) && countDownRight + countUpLeft + 1 >= 4) {
        return true;
    }

    if ((blockedDownLeft || blockedUpRight) && countDownLeft + countUpRight + 1 >= 5) {
        return true;
    } 
        
    if ((!(blockedDownLeft || blockedUpRight)) && countDownLeft + countUpRight + 1 >= 4) {
        return true;
    }

    return false;
}

function winByRow(currentClass, index) {
    let countRight = 0;
    let countLeft = 0;
    let blockedRight = false;
    let blockedLeft = false;
    for (let i = index + 1; i <= index + 5; i++) {
        if (Math.floor(i / 13) != Math.floor(index / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedRight = true;
            break;
        }

        countRight++;
    }

    for (let i = index - 1; i >= index - 5; i--) {
        if (Math.floor(i / 13) != Math.floor(index / 13)) {
            break;
        }
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedLeft = true;
            break;
        }

        countLeft++;
    }

    if (blockedLeft && blockedRight) {
        return false;
    } 

    if ((blockedLeft || blockedRight) && countLeft + countRight + 1 >= 5) {
        return true;
    } 
        
    if ((!(blockedLeft || blockedRight)) && countLeft + countRight + 1 >= 4) {
        return true;
    }

    return false;
}

function winByCollumn(currentClass, index) {
    let countUp = 0;
    let countDown = 0;
    let blockedUp = false;
    let blockedDown = false;
    for (let i = index + 13; i <= index + 5*13 && i < 117; i = i + 13) {
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedDown = true;
            break;
        }

        countDown++;
    }

    for (let i = index - 13; i >= index - 5*13 && i >= 0; i = i - 13) {
        if (!cellElements[i].classList.contains(currentClass)) {
            if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(O_CLASS)) {
                break;
            } 

            blockedUp = true;
            break;
        }

        countUp++;
    }

    if (blockedDown && blockedUp) {
        return false;
    } 

    if ((blockedDown || blockedUp) && countDown + countUp + 1 >= 5) {
        return true;
    } 
        
    if ((!(blockedDown || blockedUp)) && countDown + countUp + 1 >= 4) {
        return true;
    }

    return false;
}

