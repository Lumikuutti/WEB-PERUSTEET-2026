'use strict';

const target = document.getElementById('target');

const movies = [];

const amount = parseInt(prompt('How many movies do you wish to rate? Please input an integer.'))

for (let i = 1; i <= amount; i++) {
    let title = prompt('What is the title of the movie?');
    let rating = parseInt(prompt('Please write down your rating using a single number (0-10).'));
    let movie = {
        Title: title,
        Rating: rating
    }

    movies.push(movie);
}

movies.sort(function(a, b) {return b.Rating - a.Rating});

const h1 = document.createElement('h1');
const best = document.createTextNode('Top rated movie is: ' + movies[0].Title);
h1.appendChild(best);
target.appendChild(h1);
let h2 = document.createElement('h2');
const fullList = document.createTextNode('Full list of movies and their ratings');
h2.appendChild(fullList);
target.appendChild(h2);

for (let index of movies) {
    let p = document.createElement('p');
    let listing = document.createTextNode('Title: ' + index.Title + ', Rating: ' + index.Rating);
    p.appendChild(listing);
    target.appendChild(p);

}