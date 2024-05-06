const buttons = document.querySelectorAll('#cell');
const resetButton = document.querySelector('.reset');
const userWinDialogWindow = document.querySelector("#userWinDialog");
const botWinDialogWindow = document.querySelector("#botWinDialog");
const tieDialogWindow = document.querySelector("#tieWinDialog");

let Gameboard = [ '', '', '', '', '', '', '', '', ''];
let firstPlayerTurn = true;
let winnerCount = 0; //max 1

console.log(Gameboard); //debugging

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        console.log('win count ' + winnerCount);
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
        winChecker(); //check for win situations after user's turn
        firstPlayerTurn = false; 
        // if (firstPlayerTurn == false) {
        //     botTurn();
        //     winChecker(); //check for win situations after bot's turn
        //     firstPlayerTurn = true;
        // }
    })
})

function userTurn (cellNumber) {
    let userChoice = cellNumber - 1; //because in array counts starts from 0
    console.log(userChoice);

    //checks if '' is empty or not
    if (Gameboard[userChoice] == '') {
        Gameboard[userChoice] += 'X'
    }

    console.log('User: ' + Gameboard); //debugging
    firstPlayerTurn = true; //update firstPlayerTurn after user's turn
    console.log('User' + firstPlayerTurn);
    return {userChoice}
}

function botTurn () {
    let botChoice;
    // firstPlayerTurn = false;

    //the numbers will be randomised until the free cell will be found
    do {
        botChoice = Math.floor(Math.random() * 9);
    } while (Gameboard[botChoice] !== ''); 

    Gameboard[botChoice] += 'O';

    buttons.forEach((button) => {
        const span = button.querySelector('span');
        if (span.textContent == botChoice + 1) {
            //update the corresponding cell with 'O'
            const addO = document.createElement('p'); //X or O are added to p
            addO.textContent = 'O';
            addO.classList.add('addO');
            button.appendChild(addO);
        }
    })
    console.log('Bot' + firstPlayerTurn);
    console.log('Bot: ' + Gameboard); //debugging
}

function winChecker() {
    // Check for win or tie condition after each turn
    
    if (checkWin('X')) {
        console.log("User wins");
        // reset();
        window.alert('Yupi'); //debugging
        userWinDialogWindow.showModal();
        return {winnerCount, firstPlayerTurn};
    } else if (checkWin('O')) {
        console.log("Bot wins");
        // reset();
        window.alert('Eh'); //debugging
        botWinDialogWindow.showModal();
        return {winnerCount, firstPlayerTurn}; 
    }
    if ((!areEmptyCellsLeft()) && (winnerCount == 0)) {
        console.log("Tie");
        // reset();
        firstPlayerTurn = true;
        tieDialogWindow.showModal();
        return { winnerCount, firstPlayerTurn };
    }
    
    //call botTurn only if there's no winner yet and there are empty cells left
    if ((winnerCount == 0) && (areEmptyCellsLeft())) {
        botTurn();
        firstPlayerTurn = true; //reset firstPlayerTurn after bot's turn
    }
    
    return {winnerCount};
}

function checkWin(symbol) {
    //horizontal Wins
    if ((Gameboard[0] === symbol && Gameboard[1] === symbol && Gameboard[2] === symbol) ||
        (Gameboard[3] === symbol && Gameboard[4] === symbol && Gameboard[5] === symbol) ||
        (Gameboard[6] === symbol && Gameboard[7] === symbol && Gameboard[8] === symbol)) {
        return true;
    }
    //vertical Wins
    if ((Gameboard[0] === symbol && Gameboard[3] === symbol && Gameboard[6] === symbol) ||
        (Gameboard[1] === symbol && Gameboard[4] === symbol && Gameboard[7] === symbol) ||
        (Gameboard[2] === symbol && Gameboard[5] === symbol && Gameboard[8] === symbol)) {
        return true;
    }
    //diagonal Wins
    if ((Gameboard[0] === symbol && Gameboard[4] === symbol && Gameboard[8] === symbol) ||
        (Gameboard[2] === symbol && Gameboard[4] === symbol && Gameboard[6] === symbol)) {
        return true;
    }
    return false;
}

function areEmptyCellsLeft() {
    return Gameboard.includes('');
}

resetButton.addEventListener('click', function () {
    reset();
})

function reset() {
    Gameboard = [ '', '', '', '', '', '', '', '', ''];
    buttons.forEach((button) => {
        if (button.querySelector('.addO')) { //check if addO exists
            button.querySelector('.addO').remove(); //remove the addO element
        }
        if (button.querySelector('.addX')) { //check if addX exists
            button.querySelector('.addX').remove(); //remove the addX element
        }
    });
    firstPlayerTurn = true;
    winnerCount = 0;
    return { firstPlayerTurn, Gameboard, winnerCount };
}
