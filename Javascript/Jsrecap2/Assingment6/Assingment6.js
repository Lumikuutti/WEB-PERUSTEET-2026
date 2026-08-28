'use strict';

const target = document.getElementById('target');
const table = document.createElement('table')
const input = parseInt(prompt('Give me an integer and I will create a multiplication table for you.'));

for (let i = 1; i <= input; i++) {
    let tr = document.createElement('tr');

    for (let j = 1; j <= input; j++){
        console.log(j*i);
        let td = document.createElement('td');
        let number = document.createTextNode(j*i);
        td.appendChild(number);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

target.appendChild(table);