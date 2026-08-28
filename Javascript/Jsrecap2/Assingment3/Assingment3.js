'use strict';

const numbers = [];
let run = true;
while (run) {
    let number = prompt('Enter a number (Integer), or Done to stop.');
    if (number == 'done' || number == 'Done') {
        run = false;
    }

    else {
        number = parseInt(number);
        numbers.push(number);
    }
    
}

const even_numbers = [];
for (let index of numbers) {
    let check = index;
    if ((check % 2) == 0){
        console.log(check)
        even_numbers.push(check);
    }

}

if (even_numbers.length > 0){
 document.querySelector('#target').innerHTML = ('Even Numbers: ' + even_numbers);   
}
else {
    document.querySelector('#target').innerHTML = ('Even Numbers: None');
}

document.querySelector('p').innerHTML = ('The program has ended.');