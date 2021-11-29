// All letters on screen
const currentLetters = [];
let score = 0;
let speed = 3;
let lives = 3;

// Testing that randSentences was passed through, success
console.log(randSentences[0]);

// increase speed every 30 seconds
const nextSpeedInterval = setInterval(() =>
{
    speed++;
    console.log(speed);
}, 30000)

// a class for a key on the keyboard
class Key
{
    constructor(letter) {
        this.letter = letter;
        this.clicked = false;
        this.button = document.querySelector(`.${letter}-key`)
        this.toggleClicked = () => {
            this.clicked = !this.clicked
            this.button.classList.toggle('clicked')
        }
    }
}

// generate a list containing all buttons corresponding to the keys of the keyboard
const letterKeys = Array.from(
    Array.from({ length: 26 }, (v, i) => String.fromCharCode(97 + i)),
    (letter) => new Key(letter)
)

// Will be adding all of the letters onto the screen by appending it to this element
const h1 = document.querySelector('h1');
// This is where we'll display the score
const scoreDisplay = document.querySelector('.score');
// lives display
const livesDisplay = document.querySelector('.lives');

// Add the keydown event to the window
window.addEventListener("keydown", function(event) {
    clickKey(event);
})
// Add the keyup event listener to the window
window.addEventListener("keyup", event =>
{
    // if the key was clicked already, make it back to normal
    letterKeys.filter(letter => letter.clicked).map(letter => letter.toggleClicked())
})

// Every 800ms, generate a new letter
const nextLetterInterval = setInterval(() => 
{
    generateNewLetter();
}, 800);

// Slide every letter currently on the screen down every 5 milliseconds
const pIntervalId = setInterval(() =>
{
    currentLetters.forEach((p) => slideDown(p));
    // If there are letters on the screen and the lowest one is less than 600px from the top, remove it and shift the array to the left
    if (currentLetters.length > 0 && 700 <= pixelVal(currentLetters[0].style.top))
    {
        currentLetters[0].remove();
        currentLetters.shift();
        lives--;
        livesDisplay.innerText = `${lives} lives remaining!`;
        if (lives <= 0)
        {
            clearInterval(pIntervalId);
            clearInterval(nextLetterInterval);
            clearInterval(nextSpeedInterval);
            livesDisplay.innerText = "Game Over";
        }
    }
}, 15);

function generateNewLetter()
{
    // Create a p and configure it
    const p = document.createElement('p');
    // produces a random letter between 'A' and 'Z'
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    p.innerText = randomLetter;
    p.style.position = "absolute";
    p.style.top = "50px";
    // find which letter was generated
    const curButtonClicked = letterKeys.find(key => key.letter === randomLetter.toLowerCase())
    // find the corresponding button
    const curButtonObject = document.querySelector(`.${curButtonClicked.letter}-key`)
    // set the position of the letter based on the buttons position
    p.style.left = `${curButtonObject.offsetLeft + 40}px`;

    // Add the new letter to the screen and add it to the active letters array
    h1.append(p);
    currentLetters.push(p);
}

// Slide elem down by 1px
function slideDown(elem)
{
    let curYStr = elem.style.top;
    let curY = pixelVal(curYStr);
    curY += speed;
    elem.style.top = `${curY}px`;
}

// Given the pixel value of an element in string form, return the numerical version
function pixelVal(curYStr)
{
    let curPix = '';
    for (let i = 0; i < curYStr.length; i++)
    {
        // If the current character is a digit, add it on to curPix; if not, then end the loop
        if (typeof parseInt(curYStr.substring(i, i + 1)) == 'number')
        {
            curPix += curYStr.substring(i, i + 1);
        }
        else
        {
            break;
        }
    }
    return parseInt(curPix);
}

// Upon a key click
function clickKey(event)
{
    // find the key that was clicked
    const curButtonClicked = letterKeys.find(key => key.letter === event.key)
    const curButtonObject = document.querySelector(`.${curButtonClicked.letter}-key`)
    // make it look like it was clicked
    curButtonClicked.toggleClicked()
    // if you clicked the key and the letter was within about 100px of the center of the button, increment score
    // and remove the letter from the screen
    if (curButtonObject.offsetTop - 80 <= pixelVal(currentLetters[0].style.top)
        && pixelVal(currentLetters[0].style.top) <= curButtonObject.offsetTop + 120
        && currentLetters[0].innerText.toLowerCase() === curButtonClicked.letter)
    {
        currentLetters[0].remove();
        currentLetters.shift();
        score++;
        scoreDisplay.innerText = `${score} points`;
    }
}