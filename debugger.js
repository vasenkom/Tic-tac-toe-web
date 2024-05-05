const buttons = document.querySelectorAll('#cell');
let Gameboard = [ '', '', '', '', '', '', '', '', ''];
console.log(Gameboard); //debugging
const resetButton = document.querySelector('.reset');
let roundCount = 0
// const buttonsNumbering = document.querySelectorAll('span');
// const firstPlayerTurn = true;

//User presses on button - game begins
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        
        const addX = document.createElement('p'); //X or O are added to p
        addX.textContent = 'X';
        addX.classList.add('addX');
        //to check if there is X or O in the cell
        if (!button.querySelector('p')) {
            button.appendChild(addX);
        }
        let cellNumber = button.querySelector('span').textContent; //cell numbering is added to span which is hidden to user
        console.log(cellNumber); //debugging
        userTurn(cellNumber);
        gameLogic(); // Run game logic after user's turn
        botTurn();
        roundCount += 1;
        gameLogic(roundCount); // Run game logic after bot's turn
        console.log(roundCount);
    })
})

function gameLogic(roundCount) {
    // Check for win or tie condition after each turn
        winnerCount = 0;
        // User wins checker
        if (checkWin('X')) {
            console.log("User wins");
            winnerCount += 1;
            return; // Exit the function if there's a winner
        } else if (checkWin('O')) {
            console.log("Bot wins");
            winnerCount += 1;
            return; // Exit the function if there's a winner
        }
        if ((roundCount == 5) && (winnerCount == 0)) {
            console.log("Tie");
        }
    console.log(roundCount);
}

function userTurn (number) {
    let userChoice = number - 1; //because in array counts starts from 0
    console.log(userChoice);
    //checks if '' is empty or not
    if (Gameboard[userChoice] == '') {
        Gameboard[userChoice] += 'X'
    }
    console.log(Gameboard); //debugging
    return {userChoice}
}

function botTurn () {
    let botChoice;
    //the numbers will be randomised untill the free cell will be found
    do {
        botChoice = Math.floor(Math.random() * 9);
    } while (Gameboard[botChoice] !== ''); 
    Gameboard[botChoice] += 'O';

    buttons.forEach((button) => {
        const span = button.querySelector('span');
        if (span.textContent == botChoice + 1) { // Add 1 to match button numbering
            // Update the corresponding cell with 'O'
            const addO = document.createElement('p');
            addO.textContent = 'O';
            addO.classList.add('addO');
            button.appendChild(addO);
        }
    })

    console.log(Gameboard)
    return {botChoice}
}

function checkWin(symbol) {
    // Horizontal Wins
    if ((Gameboard[0] === symbol && Gameboard[1] === symbol && Gameboard[2] === symbol) ||
        (Gameboard[3] === symbol && Gameboard[4] === symbol && Gameboard[5] === symbol) ||
        (Gameboard[6] === symbol && Gameboard[7] === symbol && Gameboard[8] === symbol)) {
        return true;
    }
    // Vertical Wins
    if ((Gameboard[0] === symbol && Gameboard[3] === symbol && Gameboard[6] === symbol) ||
        (Gameboard[1] === symbol && Gameboard[4] === symbol && Gameboard[7] === symbol) ||
        (Gameboard[2] === symbol && Gameboard[5] === symbol && Gameboard[8] === symbol)) {
        return true;
    }
    // Diagonal Wins
    if ((Gameboard[0] === symbol && Gameboard[4] === symbol && Gameboard[8] === symbol) ||
        (Gameboard[2] === symbol && Gameboard[4] === symbol && Gameboard[6] === symbol)) {
        return true;
    }
    return false;
}

resetButton.addEventListener('click', function () {
    reset()
})

function reset() {
    Gameboard = [ '', '', '', '', '', '', '', '', ''];
    buttons.forEach((button) => {
        const p = button.querySelector('p');
        if (p) { // Check if p is not null
            p.textContent = '';
        }
    });
}