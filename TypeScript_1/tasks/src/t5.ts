export { }

// TODO: Implement the lengthOrSquare function
// define the type(s) for 'value'
function lengthOrSquare(value: number | string): number {
    // TODO: Use a type guard to check the actual type of 'value'
    // if type is string, retrurn the length of the string
    // if type is number return the square of the number
    if (typeof value === 'string') {
        return value.length

    }

    else {
        return value * value
    }
}

// Prompt the user to enter a value as either a string or a number
const userInput = prompt('Give me a word string to count or a number to square.')/* TODO: Get user input */;
const parsedValue = isNaN(Number(userInput)) ? userInput : Number(userInput) /* TODO: If userInput is numeric, convert it to number else keep it as string */;

// Call the lengthOrSquare function
if (parsedValue) {
    const result = lengthOrSquare(parsedValue);
    console.log(typeof result);
    console.log(result);
}
