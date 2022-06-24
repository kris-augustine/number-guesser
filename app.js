/*
GAME RULES
- Player must guess a number between 1 and 10
- Player gets 3 number of guesses
- Must guess the correct number to win the game.
- Have fun.
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3

// UI Elements
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message')

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

// Event listener to reset the game after winning or losing
gameWrapper.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload()
    }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
    // Get input
    let guess = parseInt(guessInput.value) // returns a number not a string

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
        guessInput.value = ''
    } else if (guess === winningNum) {
        // Game over - Player won
        gameOver(true, `${winningNum} is correct, You won!`)
    } else {
        // Wrong number reduce number of guess left by 1
        guessesLeft -= 1

        if (guessesLeft === 0) {
            // Game over - Player lost
            gameOver(
                false,
                `Game over, you lost. The corect number was ${winningNum}`
            )
        } else {
            // Game continues - wrong answer

            // Chage border color
            guessInput.style.borderColor = 'red'
            // Clear input field
            guessInput.value = ''
            // Tell user it's a wrong number
            setMessage(
                `${guess} is not correct, ${guessesLeft} guesses left`,
                'red'
            )
        }
    }
})

// Game over
function gameOver(won, msg) {
    let color
    won === true ? (color = 'green') : (color = 'red')

    // Disable Input
    guessInput.disabled = true

    // Change border color
    guessInput.style.borderColor = color

    // Set text color
    message.style.color = color

    // Set message
    setMessage(msg)

    // Play Again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again' // append a class name to the btn to use to reset the game
}

// Randon winning number generator
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Set message function
function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg
}
