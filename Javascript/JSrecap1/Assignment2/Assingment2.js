'use strict';

const x1 = parseFloat(prompt('Give the x coordinate of the first point.'));
const y1 = parseFloat(prompt('Give the y coordinate of the first point.'));
const x2 = parseFloat(prompt('Give the x coordinate of the second point.'));
const y2 = parseFloat(prompt('Give the y coordinate of the second point.'));

const distance = Math.sqrt(((x2 - x1)**2 + (y2 - y1)**2))

document.querySelector('#target').innerHTML = 'The distance between the points is: ' + distance;