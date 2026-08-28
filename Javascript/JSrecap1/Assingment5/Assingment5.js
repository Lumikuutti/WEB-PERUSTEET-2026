'use strict';

const input = parseInt(prompt('Give me a natural number. I will calculate and present the sum of all natural number up to and including it.'));
let sum = 0;

for (let i = 1; i <= input; i++) {
    sum += i;
}

document.querySelector('#target').innerHTML = 'The sum is: ' + sum;