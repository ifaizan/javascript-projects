/* GAME FUNCTION 
- player must choose a number between max and min
- player gets a certain amount of guesses
- notify player how many guesses are remaining
- notify player the correct answer if they loose
- let player to play again */

let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

const gameUI = document.querySelector('#game'),
      maxUI = document.querySelector('.max-num'),
      minUI = document.querySelector('.min-num'),
      guessInputUI = document.querySelector('#guess-input'),
      guessBtnUI = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

maxUI.textContent = max;
minUI.textContent = min;

gameUI.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

guessBtnUI.addEventListener('click', function() {
    let guess = parseInt(guessInputUI.value);

    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter number between ${min} and ${max}`, 'red');
    }
 
    if (guess === winningNum) {
        gameOver('Congratulations! You won', 'green')
    } else {
        guessesLeft = guessesLeft - 1;
        guessInputUI.value = '';

        if(guessesLeft === 0) {
            gameOver(`Game Over! You Lost. The correct answer was ${winningNum}`, 'red')
        } else {
            setMessage(`${guess} is wrong. ${guessesLeft} guess are left`, '#CCCC00');
        }
    }
});

function getRandomNumber(min, max) {
    return (Math.floor(Math.random()*(max-min+1)+min));
}

function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

function gameOver(msg, color) {
    //disable the input
    guessInputUI.disabled = 'true';
    guessInputUI.style.borderColor = color;
    setMessage(msg, color);

    guessBtnUI.value = 'Play Again';
    guessBtnUI.className += 'play-again';
}