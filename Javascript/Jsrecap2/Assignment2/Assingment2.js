'use strict';

const numbers = [];
for (let i = 1; i <= 5; i++) {
    let number = parseInt(prompt('Enter a number. (Integer)'));
    numbers.push(number);
}

console.log('Numbers: ' + numbers);

let check = parseInt(prompt('Give me an integer and I will check if it is in the list.'));
if (numbers.includes(check)) {
    console.log('The number ' + check + ' is in the list.');
}

else {
    console.log('The number ' + check + ' is not in the list.');
}

numbers.pop();
console.log('Updated Numbers: ' + numbers);

numbers.sort((a,b) => a-b);
console.log('Sorted Numbers: ' + numbers);