"use strict";
// TODO: Create a user object using the defined interface. Add all properties
const user = {
    username: 'First',
    email: 'email@me',
    bio: 'I exist'
};
// TODO: Create another user object using the defined interface. Don't add bio
const user2 = {
    username: 'First',
    email: 'email@me',
};
// Function to display user information
function displayUserInfo(user) {
    console.log(user.username);
    console.log(user.email);
    if (user.bio) {
        console.log(user.bio);
    }
    // TODO: console log all properties of a user separately. Example: console.log(user.email)
}
// Display user information
displayUserInfo(user);
displayUserInfo(user2);
