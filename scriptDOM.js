const buttons = document.querySelectorAll('#cell');
const Gameboard = [ '', '', '', '', '', '', '', '', ''];
console.log(Gameboard); //debugging
// const buttonsNumbering = document.querySelectorAll('span');
// const firstPlayerTurn = true;

//User presses on button - game begins
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        const addX = document.createElement('p'); //X and O are added to p
        addX.textContent = 'X';
        addX.classList.add('addX');
        //to check if there is X or O in the cell
        if (!button.querySelector('p')) {
            button.appendChild(addX);
        }
        let cellNumber = button.querySelector('span').textContent; //cell numbering is added to span which is hidden to user
        console.log(cellNumber) //debugging
        userTurn(cellNumber)
    })
})

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