const p = document.createElement('p');
p.innerText = "This second line is a test, it was added via javascript";
console.log(p);
const h1 = document.querySelector('h1');
console.log(h1);
h1.append(p);
console.log("here");