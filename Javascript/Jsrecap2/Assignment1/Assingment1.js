'use strict';

const fruits = ['apple','banana','orange','grape','kiwi'];
console.log('Fruits: ' + fruits);
console.log('Lenght of Fruits: ' + fruits.length);
console.log('Element at index 2: ' + fruits[2]);
console.log('Last Element of Fruits: ' + fruits[(fruits.length - 1)]);

const vegetables = [];
for (let i = 1; i <= 3; i++) {
    let veggie = prompt('Enter a vegetable.');
    vegetables.push(veggie);
}

console.log('Vegetables: ' + vegetables);
console.log('Lenght of Vegetables: ' + vegetables.length);