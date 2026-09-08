type Item = {
    name: string
    price: number
    quantity: number
}


// TODO: Write type (or interface) Item
// TODO: Define the properties 'name', 'price', and 'quantity' within the type

// Create an empty array named 'cart' to store the items
const cart: Item[] = [];

// TODO: Implement a loop to prompt the user for item details
// Use 'while' loop to keep prompting until an empty item name is entered
while (true) {
    // TODO: Prompt user for item name, price, and quantity
    const itemName = prompt('Enter item name')/* TODO: Get user input */;
    const itemPrice = prompt('Enter item price')/* TODO: Get user input */;
    const itemQuantity = prompt('Enter item quantatiy')/* TODO: Get user input */;

    // Break the loop if an empty or cancel
    if (!itemName || !itemPrice || !itemQuantity) {
        break;
    }

    if (isNaN(Number(itemPrice)) || isNaN(Number(itemQuantity))) {
        break;
    }

    // Create an item object and add it to the 'cart' array
    const newItem: Item = {
        name: itemName,
        price: Number(itemPrice),
        quantity: Number(itemQuantity)
    };

    cart.push(newItem);
}

// Calculate the total cost using the 'map' and 'reduce' functions
const totalCost = cart.map(item => item.price * item.quantity).reduce((sum, cost) => sum + cost, 0);

// Display the total cost to the user
console.log(`Total cost of the shopping cart: $${totalCost.toFixed(2)}`);
