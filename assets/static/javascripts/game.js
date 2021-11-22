// All letters on screen
const currentLetters = [];
let score = 0;
let curButtonClicked = document.querySelector('.q-key');

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
    if (event.key === 'a') curButtonClicked.classList.toggle('hover');
})

// Every second, generate a new letter
const nextLetterInterval = setInterval(() => 
{
    generateNewLetter();
}, 1000);

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
    p.innerText = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    p.style.position = "absolute";
    p.style.top = "50px";
    // give it a random horizontal position
    p.style.left = `${220 + Math.round(Math.random() * 10) * 100}px`;

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
    switch(event.key)
    {
        case 'a':
            // Make the a key look clicked
            curButtonClicked = document.querySelector('.a-key');
            curButtonClicked.classList.toggle('hover');
            // Check if it was clicked at right timing, if so, remove the lowest letter
            if (currentLetters.length > 0 && 450 <= pixelVal(currentLetters[0].style.top))
            {
                currentLetters[0].remove();
                currentLetters.shift();
                score++;
                scoreDisplay.innerText = score;
            }
    }
}