const target = document.getElementById('target');

let date = 'Date and Time: ' + new Date().toLocaleString();
let browser = 'Browser information: ' + navigator.userAgent;
let screenSize = 'Screen size: ' + screen.height + ' x ' + screen.width + ' px';
let screenSpace =
  'Maximum screen space for the browser: ' +
  screen.availHeight +
  ' x ' +
  screen.availWidth +
  ' px';

const toPrint = [date, browser, screenSize, screenSpace];

for (let item of toPrint) {
  let p = document.createElement('p');
  p.textContent = item;
  target.appendChild(p);
}

// console.log(navigator.userAgent);
// console.log(screen.height);
// console.log(screen.width);
// console.log(screen.availHeight);
// console.log(screen.availWidth);
// console.log(date.toLocaleString());
