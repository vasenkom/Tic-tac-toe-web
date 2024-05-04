const Gameboard = [ '', '', '', '', '', '', '', '', ''];
console.log(Gameboard);

function userTurn () {
    let userChoice = window.prompt();
    console.log(userChoice);
    if (Gameboard[userChoice] == '') {
        Gameboard[userChoice] += 'X'
    };
    return {userChoice}
}

function BotTurn () {
    let botChoice;

    do {
        botChoice = Math.floor(Math.random() * 9);
    } while (Gameboard[botChoice] !== ''); 

    Gameboard[botChoice] += 'O';
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

function gameBegins() {
    for (let i = 0; i < 9; i++) {

        userTurn();

        if (checkWin('X')) {
            console.log("User wins");
            return; // Exit the function if there's a winner
        }

        BotTurn();

        if (checkWin('O')) {
            console.log("Bot wins");
            return; // Exit the function if there's a winner
        }
        console.log(Gameboard);
       
        if (i == 8) {
            console.log("Tie")
        }
    }
}

gameBegins()