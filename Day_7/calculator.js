export const add = (a, b) => {
    return a + b;
};

export const subtract = (a, b) => {
    return a - b;
};

export const multiply = (a, b)=>{
    return a * b
}

export const divide = (a, b)=>{
    return a / b
}

// THE MAGIC PART:
// We bundle these functions into an object and export them.
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide
// };