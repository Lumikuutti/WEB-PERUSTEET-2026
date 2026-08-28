'use strict';

const score = parseFloat(prompt('Give me your score so I can grade you.'));

if (score < 40) {
    document.querySelector('#target').innerHTML = 'Your grade is 0. You have failed.';
}

else if (score < 52) {
    document.querySelector('#target').innerHTML = 'Your grade is 1. You have passed barely.';
}

else if (score < 64) {
    document.querySelector('#target').innerHTML = 'Your grade is 2. You have passed but could do better.';
}

else if (score < 76) {
    document.querySelector('#target').innerHTML = 'Your grade is 3. You have passed.';
}

else if (score < 88) {
    document.querySelector('#target').innerHTML = 'Your grade is 4. You have done well.';
}

else if (score < 101) {
    document.querySelector('#target').innerHTML = 'Your grade is 5. You have done exceptionally.';
}

else {
    document.querySelector('#target').innerHTML = 'Impossible, refresh and be more honest.';
}