/*
VARIABLES FOR GAMEPLAY STATS/FUNCTIONALITY
*/
// All letters on screen
let currentLetters = [];
// Variables that'll increment throughout gameplay
let score = 0;
let speed = parseInt(startSpeed);
let lives = 3;
let totalLetterCount = 0;
let mistakes = 0;
// Variables relating to the current sentence to type
let currRandIndex = 0;
let currRandSentence = randSentences[currRandIndex];
let currSentenceToShow = '';



/*
THE ELEMENTS WHERE WE DISPLAY INFORMATION ABOUT THE GAME
*/
// Will be adding all of the letters onto the screen by appending it to this element
const start = document.querySelector('.start');
// This is where we'll display the score
const scoreDisplay = document.querySelector('.score');
// This is where we'll display the lives left
const livesDisplay = document.querySelector('.lives');



/*
CLASS FOR KEYS AND CREATING AN ARRAY OF THE ONES PRESENT
*/
// A class for a key on the keyboard
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
// Generate an array of all keys corresponding to each button on the keyboard
const letterKeys = Array.from(
    Array.from({ length: 26 }, (v, i) => String.fromCharCode(97 + i)),
    (letter) => new Key(letter)
);



/*
EVENT HANDLERS
*/
// Add the keydown event to the window
window.addEventListener("keydown", function(event) {
    clickKey(event);
});
// Add the keyup event listener to the window
window.addEventListener("keyup", event =>
{
    // If the key was clicked already, make it back to normal
    letterKeys.filter(letter => letter.clicked).map(letter => letter.toggleClicked())
});



/* 
GAMEPLAY INTERVALS
*/
// Increase speed every 30 seconds
const nextSpeedInterval = setInterval(() =>
{
    speed++;
}, 30000)
// Every 800ms, generate a new letter
const nextLetterInterval = setInterval(() => 
{
    generateNewLetter();
}, 800);
// Slide every letter currently on the screen down every 15 milliseconds and check if it needs to be removed
const pIntervalId = setInterval(() =>
{
    currentLetters.forEach((p) => slideDown(p));
    // If there are letters on the screen and the lowest one is lower than 750px from the top, remove it and shift the array to the left
    if (currentLetters.length > 0 
        && 750 <= pixelVal(currentLetters[0].style.top))
    {
        totalLetterCount++;
        mistakes++;
        currentLetters[0].remove();
        currentLetters.shift();
        // If you missed a normal letter, reduce your life
        if (!currentLetters[0].classList.contains('red-tile'))
        {
            reduceLife();
        }
    }
}, 15);



/*
HELPER FUNCTIONS
*/
// Updates the screen with where the sentence is at during typing
function updateSentenceToShow(param = '') {
    currSentenceToShow = currSentenceToShow.length === 15
        ? currSentenceToShow.substring(1) + currRandSentence[0] + param
        : currSentenceToShow + currRandSentence[0] + param
    const sentenceElement = document.querySelector('.sentence');
    sentenceElement.innerText = currSentenceToShow;
}
// Retrieves the next sentence from the array (if you're at the end, go back to the beginning)
function getNextRandSentence() {
    currRandIndex = currRandIndex === (randSentences.length - 1)
        ? 0 : currRandIndex + 1
    currRandSentence = randSentences[currRandIndex]
}
// Update the sentence on screen for the next letter and retrieve what the sentence is supposed to be
//  past that letter
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
// Reduce life by 1 and end the game if necessary
function reduceLife() {
    lives--;
    livesDisplay.innerText = `${lives} lives remaining!`;
    if (lives <= 0)
    {
        clearInterval(pIntervalId);
        clearInterval(nextLetterInterval);
        clearInterval(nextSpeedInterval);
        console.log(totalLetterCount)
        console.log(mistakes)
        livesDisplay.innerText = `Game Over! Accuracy: ${Math.round(Math.max((((totalLetterCount - mistakes)/totalLetterCount) * 100), 0))}%`;
        currentLetters = [];

        // Display a button to go back to the home page
        const backForm = document.createElement('form');
        backForm.setAttribute('action', `user/${currentUser._id}`);
        backForm.setAttribute('method', 'post');
        const backButton = document.createElement('button');
        backButton.setAttribute('class', 'p-2 btn btn-primary');
        backButton.innerText = 'Back home';
        const scoreValue = document.createElement('input');
        scoreValue.setAttribute('type', 'hidden');
        scoreValue.setAttribute('value', `${score}`);
        scoreValue.setAttribute('name', 'score');
        const gameMode = document.createElement('input');
        gameMode.setAttribute('type', 'hidden');
        gameMode.setAttribute('value', `${mode}`);
        gameMode.setAttribute('name', 'mode');
        const poisonStatus = document.createElement('input');
        poisonStatus.setAttribute('type', 'hidden');
        poisonStatus.setAttribute('value', `${poison}`);
        poisonStatus.setAttribute('name', 'poison');
        const curDate = document.createElement('input');
        curDate.setAttribute('type', 'hidden');
        curDate.setAttribute('value', `${Date.now()}`);
        curDate.setAttribute('name', 'date');

        // Append all of the elements to the page
        backForm.append(scoreValue);
        backForm.append(gameMode);
        backForm.append(poisonStatus);
        backForm.append(backButton);
        backForm.append(curDate);

        backForm.style.position = 'absolute';
        backForm.style.top = '400px';
        backForm.style.left = '300px';
        start.append(backForm);
    }
}
// Generate a new letter
function generateNewLetter()
{
    const p = document.createElement('p');
    let letter;
    let chanceOfRed;

    // If you're on poison mode, generate the chance for the tile to be a poison one
    if (poison === 'poison') {
        chanceOfRed = Math.floor((Math.random() * 10) + 1);
    }
    // If you're on random, generate a random letter
    if (mode === 'random') {
        letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    // If you're on normal, generate the next letter in the sentence
    else if (mode === 'normal') {
        getNextLetterFromRandSentences();
        letter = currRandSentence[0].toUpperCase();
        currRandSentence = currRandSentence.substring(1);
    }

    // Configure the p element
    p.innerText = letter;
    p.style.position = "absolute";
    p.style.top = "50px";
    switch (gameFont)
    {
        case 'roboto':
            p.classList.toggle('roboto');
            break;
        case 'roboto-mono':
            p.classList.toggle('roboto-mono');
            break;
        case 'cursive':
            p.classList.toggle('cursive');
            break;
        case 'anton':
            p.classList.toggle('anton');
    }
    if (chanceOfRed === 1)
    {
        p.classList.toggle('red-tile');
    }

    // Find which letter was generated
    const curButtonClicked = letterKeys.find(key => key.letter === letter.toLowerCase())
    // Set the position of the letter based on the position of its corresponding button
    p.style.left = `${(curButtonClicked.button.offsetLeft + curButtonClicked.button.offsetLeft + curButtonClicked.button.offsetWidth)/2 - 13}px`;

    // Add the new letter to the screen and add it to the active letters array
    start.append(p);
    currentLetters.push(p);
}
// Slide elem down by speed px
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
// What to do when a key is clicked
function clickKey(event)
{
    // Find the key that was clicked
    const curButtonClicked = letterKeys.find(key => key.letter === event.key);
    const curButtonObject = document.querySelector(`.${curButtonClicked.letter}-key`)
    // Make it look like it was clicked
    curButtonClicked.toggleClicked();
    // If you clicked the right key and the letter was within about 100px of the center of the button, increment score
    // and remove the letter from the screen
    if (curButtonObject.offsetTop - 80 <= pixelVal(currentLetters[0].style.top)
        && pixelVal(currentLetters[0].style.top) <= curButtonObject.offsetTop + 120
        && currentLetters[0].innerText.toLowerCase() === curButtonClicked.letter)
    {
        // Remove the letter and increment
        currentLetters[0].remove();
        totalLetterCount++;
        currentLetters.shift();

        // If you clicked a good tile, increment your score
        if (!currentLetters[0].classList.contains('red-tile'))
        {
            score += 1000 - Math.abs(curButtonObject.offsetTop + 20 - pixelVal(currentLetters[0].style.top));
        }
        // If the tile was poisoned, increment, reduce life, and reduce score
        else if (currentLetters[0].classList.contains('red-tile')) 
        {
            score = Math.max(0, score - 1000 - Math.abs(curButtonObject.offsetTop + 20 - pixelVal(currentLetters[0].style.top)));
            mistakes++;
            reduceLife();
            
        }

        // Update the csore display
        scoreDisplay.innerText = `${score} points`;
    }
    // If you didn't click the right letter or clicked it way too early, increase the number of mistakes 
    else 
    {
        mistakes++;
    }
}