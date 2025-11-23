import {add , subtract, multiply, divide} from './calculator.js'

console.log('Starting App...')

const sum = add(5, 8)
const diff = subtract(8, 4)
const mul = multiply(5, 5)
const div = divide(100 , 10)

console.log(`The sum is ${sum}`)
console.log(`The Diff is ${diff}`)
console.log(`The Multiply is ${mul}`)
console.log(`The Divide is ${div}`)