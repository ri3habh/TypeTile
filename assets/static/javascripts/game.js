// All letters on screen
let currentLetters = [];
let score = 0;
let speed = 3;
let lives = 3;
let totalLetterCount = 0;
let mistakes = 0;

// make a constant which contains all sentences smushed together
let currRandIndex = 0
let currRandSentence = randSentences[currRandIndex]
let currSentenceToShow = ''

// increase speed every 30 seconds
const nextSpeedInterval = setInterval(() =>
{
    speed++;
}, 30000)

function updateSentenceToShow(param = '') {
    currSentenceToShow = currSentenceToShow.length === 15
        ? currSentenceToShow.substring(1) + currRandSentence[0] + param
        : currSentenceToShow + currRandSentence[0] + param
    const sentenceElement = document.querySelector('.sentence');
    sentenceElement.innerText = currSentenceToShow;
}

function getNextRandSentence() {
    currRandIndex = currRandIndex === (randSentences.length - 1)
        ? 0 : currRandIndex + 1
    currRandSentence = randSentences[currRandIndex]
}

function getNextLetterFromRandSentences() {
    while(!currRandSentence[0].match(/^[A-Za-z]+$/)) {
        if (currRandSentence.length === 1) {
            updateSentenceToShow(' ');
            getNextRandSentence()
        } else {
            updateSentenceToShow();
            currRandSentence = currRandSentence.substring(1)
        }
    }
    updateSentenceToShow();
}

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

function reduceLife() {
    lives--;
    livesDisplay.innerText = `${lives} lives remaining!`;
    if (lives <= 0)
    {
        clearInterval(pIntervalId);
        clearInterval(nextLetterInterval);
        clearInterval(nextSpeedInterval);
        livesDisplay.innerText = `Game Over! Accuracy: ${((totalLetterCount - mistakes)/totalLetterCount) * 100}%`;
        currentLetters = [];
    }
}

// Slide every letter currently on the screen down every 5 milliseconds
const pIntervalId = setInterval(() =>
{
    currentLetters.forEach((p) => slideDown(p));
    // If there are letters on the screen and the lowest one is less than 600px from the top, remove it and shift the array to the left
    if (currentLetters.length > 0 
        && 750 <= pixelVal(currentLetters[0].style.top)
        && !currentLetters[0].classList.contains('red-tile'))
    {
        totalLetterCount++;
        currentLetters[0].remove();
        currentLetters.shift();
        reduceLife();
    } else if (currentLetters.length > 0 
        && 700 <= pixelVal(currentLetters[0].style.top)
        && currentLetters[0].classList.contains('red-tile')) {
            currentLetters[0].remove();
            currentLetters.shift();
            totalLetterCount++;
    }
}, 15);

function generateNewLetter()
{
    // Create a p and configure it
    const p = document.createElement('p');
    // produces a random letter between 'A' and 'Z'
    let randomLetter
    let chanceOfRed = Math.floor((Math.random() * 10) + 1)
    if (mode === 'random') {
        randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    else {
        getNextLetterFromRandSentences()
        randomLetter = currRandSentence[0].toUpperCase();
        currRandSentence = currRandSentence.substring(1);
    }
    p.innerText = randomLetter;
    p.style.position = "absolute";
    p.style.top = "50px";
    if (chanceOfRed === 1)
    {
        p.classList.toggle('red-tile');
    }
    // find which letter was generated
    const curButtonClicked = letterKeys.find(key => key.letter === randomLetter.toLowerCase())
    // find the corresponding button
    const curButtonObject = document.querySelector(`.${curButtonClicked.letter}-key`)
    // set the position of the letter based on the buttons position
    p.style.left = `${(curButtonObject.offsetLeft + curButtonObject.offsetLeft + curButtonObject.offsetWidth)/2 - 13}px`;
    console.log(curButtonObject.offsetWidth);

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
        && currentLetters[0].innerText.toLowerCase() === curButtonClicked.letter
        && !currentLetters[0].classList.contains('red-tile'))
    {
        currentLetters[0].remove();
        totalLetterCount++;
        currentLetters.shift();
        score += 1000 - Math.abs(curButtonObject.offsetTop + 20 - pixelVal(currentLetters[0].style.top));
        scoreDisplay.innerText = `${score} points`;
    } else if (currentLetters[0].classList.contains('red-tile')){
        reduceLife();
        currentLetters[0].remove();
        mistakes++;
        totalLetterCount++;
        currentLetters.shift();
        score = Math.max(0, score - 1000 - Math.abs(curButtonObject.offsetTop + 20 - pixelVal(currentLetters[0].style.top)));
        scoreDisplay.innerText = `${score} points`;
    } else {
        mistakes++;
    }
}