const buttons = document.querySelectorAll('#cell');
const firstPlayerTurn = true;

buttons.forEach((button) => {
    button.addEventListener('click', function() {
        const addX = document.createElement('p');
        addX.textContent = 'X';
        addX.classList.add('addX');
        if (!button.querySelector('p')) {
            button.appendChild(addX);
        }
    })
})