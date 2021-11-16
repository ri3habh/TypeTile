// Create a p and configure it
const p = document.createElement('p');
p.innerText = "A";
p.style.position = "absolute";
p.style.top = "50px";

// Add an event listener to the a button
const button = document.querySelector('button.a-key');
button.addEventListener('click', clickA);

// Append it to h1
const h1 = document.querySelector('h1');
h1.append(p);

// Slide it down every 10 milliseconds
const pIntervalId = setInterval(() =>
{
    slideDown(p);
}, 5);

// Just made these for sliding down
function slideDown(elem)
{
    let curYStr = elem.style.top;
    let curY = pixelVal(curYStr);
    curY += 1;
    if (curY >= 700)
    {
        elem.remove();
        clearInterval(pIntervalId);
    }
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
    if (450 <= pixelVal(p.style.top))
    {
        p.remove();
    }
}