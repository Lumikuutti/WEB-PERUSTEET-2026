'use strict';

const side1 = parseInt(prompt('Give the first side of the triangle. (Integer)'));
const side2 = parseInt(prompt('Give the second side of the triangle. (Integer)'));
const side3 = parseInt(prompt('Give the final side of the triangle. (Integer)'));

if (side1 == side2 && side1 == side3) {
    document.querySelector('#target').innerHTML = 'The triangle is equilateral.';
}

else if (side1 == side2 || side1 == side3 || side2 == side3 ) {
    document.querySelector('#target').innerHTML = 'The triangle is isosceles.';
}

else {
    document.querySelector('#target').innerHTML = 'The triangle is scalene.';
}