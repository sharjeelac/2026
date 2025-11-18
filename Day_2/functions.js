const add = (a, b) => a + b;

const square = (a) => a * a;

const evens = arr => arr.filter(num => num%2 ===0)

const double = arr => arr.map(num => num * 2)

const greet = name => console.log(`Hellow ${name}`)


let arr = [1,2,3,4, 5,6,7,8,]

console.log(add(2,4))
console.log(square(5))
console.log(double(arr))
console.log(evens(arr))
greet('sharjeel')