let currentLetters = [];
const bg = document.querySelector('.bg');

const nextLetterInterval = setInterval(() => generateNewLetter(), 800);

const pIntervalId = setInterval(() =>
{
  console.log(currentLetters.length)
    currentLetters.forEach((p) => slideDown(p));
    // If there are letters on the screen and the lowest one is lower than 750px from the top, remove it and shift the array to the left
    if (currentLetters.length > 0 
        && 750 <= pixelVal(currentLetters[0].style.top))
    {
        currentLetters[0].remove();
        currentLetters.shift();
    }
}, 15);

function generateNewLetter()
{
    const p = document.createElement('p');
    let letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Configure the p element
    p.innerText = letter;
    p.style.position = "absolute";
    p.style.top = "50px";
    p.style.left = `${200 + (Math.floor(Math.random() * 10) * 100)}px`;

    // Add the new letter to the screen and add it to the active letters array
    bg.append(p);
    currentLetters.push(p);
}

// Slide elem down by speed px
function slideDown(elem)
{
    let curYStr = elem.style.top;
    let curY = pixelVal(curYStr);
    curY += 3;
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