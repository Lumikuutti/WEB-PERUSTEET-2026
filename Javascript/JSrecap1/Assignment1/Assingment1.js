'use strict';

const celsius = parseFloat(prompt('Give the tempature in Celsius to convert.'));
const fahrenheit = (celsius * 9/5) + 32;
const kelvin = celsius + 273.15;

document.querySelector('#fahrenheit').innerHTML = fahrenheit + 'F';
document.querySelector('#kelvin').innerHTML = kelvin + 'K';