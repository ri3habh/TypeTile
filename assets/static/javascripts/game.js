const currentLetters = [];
let score = 0;

// Add an event listener to the a button
const button = document.querySelector('button.a-key');
button.addEventListener('click', clickA);

// Append it to h1
const h1 = document.querySelector('h1');

const nextLetterInterval = setInterval(() => 
{
    generateNewLetter();
}, 1000);

// Slide it down every 10 milliseconds
const pIntervalId = setInterval(() =>
{
    console.log(currentLetters)
    currentLetters.forEach((p) => slideDown(p));
    if (currentLetters.length > 0 && 600 <= pixelVal(currentLetters[0].style.top))
    {
        currentLetters[0].remove();
        currentLetters.shift();
    }
}, 5);

function generateNewLetter()
{
    // Create a p and configure it
    const p = document.createElement('p');
    p.innerText = "A";
    p.style.position = "absolute";
    p.style.top = "50px";
    p.style.left = `${220 + Math.round(Math.random() * 10) * 100}px`;

    h1.append(p);
    currentLetters.push(p);
}

// Just made these for sliding down
function slideDown(elem)
{
    let curYStr = elem.style.top;
    let curY = pixelVal(curYStr);
    curY += 1;
    elem.style.top = `${curY}px`;
}

function pixelVal(curYStr)
{
    if (typeof parseInt(curYStr.substring(0, 4) == 'number'))
    {
        return parseInt(curYStr.substring(0, 4));
    }
    else if (typeof parseInt(curYStr.substring(0, 3) == 'number'))
    {
        return parseInt(curYStr.substring(0, 3));
    }
    else if (typeof parseInt(curYStr.substring(0, 2) == 'number'))
    {
        return parseInt(curYStr.substring(0, 2));
    }
    else
    {
        return parseInt(curYStr.substring(0, 1));
    }
}

// Click a function
function clickA()
{
    if (currentLetters.length > 0 && 450 <= pixelVal(currentLetters[0].style.top))
    {
        currentLetters[0].remove();
        currentLetters.shift();
        score++;
    }
}