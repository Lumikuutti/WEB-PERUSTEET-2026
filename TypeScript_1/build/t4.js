// Implement instances of the 'Product' type
function createElectronicDevice() {
    // TODO: Prompt user for electronic device details (brand and model)
    const brand = prompt('What is the brand of the device?') /* TODO: Get user input for brand */;
    const model = prompt('What is the model of the device?') /* TODO: Get user input for model */;
    if (!brand || !model) {
        throw new Error('All details must be inputted.');
    }
    // TODO: return object containing brand and model
    const device = {
        type: 'electronic',
        brand: brand,
        model: model
    };
    return device;
}
function createBook() {
    // TODO: Prompt user for book details (title and author)
    const title = prompt('What is the title of the book?') /* TODO: Get user input for title */;
    const author = prompt('Who is the author of the book?') /* TODO: Get user input for author */;
    if (!title || !author) {
        throw new Error('All details must be inputted.');
    }
    const book = {
        type: 'book',
        title: title,
        author: author
    };
    // TODO: return object containing title and author
    return book;
}
// Create instances of 'Product'
const electronicProduct = createElectronicDevice();
const bookProduct = createBook();
// Display the details of each product
function displayProductDetails(product) {
    console.log(`Product Type: ${product.type}`);
    if (product.type === 'electronic') {
        console.log(`Brand: ${product.brand}`);
        console.log(`Model: ${product.model}`);
    }
    else {
        console.log(`Title: ${product.title}`);
        console.log(`Author: ${product.author}`);
    }
}
console.log('Electronic Device Details:');
displayProductDetails(electronicProduct);
console.log();
console.log('Book Details:');
displayProductDetails(bookProduct);
export {};
