// All letters on screen
const currentLetters = [];
let score = 0;

// a class for a key on the keyboard
class Key
{
    constructor(letter) {
        this.letter = letter;
        this.clicked = false;
        this.button = document.querySelector(`.${letter}-key`)
        this.toggleClicked = () => {
            this.clicked = !this.clicked
            this.button.classList.toggle('hover')
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
const scoreDisplay = document.querySelector('h2');

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

// Every second, generate a new letter
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
    }
}, 5);

function generateNewLetter()
{
    // Create a p and configure it
    const p = document.createElement('p');
    // produces a random letter between 'A' and 'Z'
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    p.innerText = randomLetter;
    p.style.position = "absolute";
    p.style.top = "50px";
    // give it a random horizontal position
    const col = 'QAZ'.includes(randomLetter) ? 0
        : 'WSX'.includes(randomLetter) ? 1
        : 'EDC'.includes(randomLetter) ? 2
        : 'RFV'.includes(randomLetter) ? 3
        : 'TGB'.includes(randomLetter) ? 4
        : 'YHN'.includes(randomLetter) ? 5
        : 'UJM'.includes(randomLetter) ? 6
        : 'IK'.includes(randomLetter) ? 7
        : 'OL'.includes(randomLetter) ? 8
        : 9;

    p.style.left = `${220 + (100 * col)}px`

    // Add the new letter to the screen and add it to the active letters array
    h1.append(p);
    currentLetters.push(p);
}

// Slide elem down by 1px
function slideDown(elem)
{
    let curYStr = elem.style.top;
    let curY = pixelVal(curYStr);
    curY += 1;
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
    // After looping, return curPix converted to an int
    return parseInt(curPix);
}

// Click a function
function clickKey(event)
{
    // find the key that was clicked
    const curButtonClicked = letterKeys.find(key => key.letter === event.key)
    // make it look like it was clicked
    curButtonClicked.toggleClicked()
    // if the key is low enough and the letter of the key was clicked, increment score
    // and remove the letter from the screen
    if (450 <= pixelVal(currentLetters[0].style.top)
        && currentLetters[0].innerText.toLowerCase() === curButtonClicked.letter)
    {
        currentLetters[0].remove();
        currentLetters.shift();
        score++;
        scoreDisplay.innerText = score;
    }
}