'use strict';

function sortArray (array) {
    array.sort((a,b) => a-b);
}

let numbers = [5,4,7,8,1,2,9];

console.log('Original array: ' + numbers);

sortArray(numbers);

console.log('Sorted array: ' + numbers);