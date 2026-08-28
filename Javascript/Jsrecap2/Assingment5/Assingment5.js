'use strict';

function sortArray (array, order) {
    array.sort((a,b) => a-b);
    if (order == 'desc'){
        array.reverse()
    }
}

let numbers = [5,4,7,8,1,2,9];

console.log('Original array: ' + numbers);

sortArray(numbers, 'desc');

console.log('Sorted array: ' + numbers);

sortArray(numbers, 'asc');

console.log('Re-Sorted array: ' + numbers);