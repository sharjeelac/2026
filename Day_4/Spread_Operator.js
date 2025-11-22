const fruits = ["Apple", "Banana", "Grapes"]
const others = ['Cream', 'Shake']

const chaat = [...fruits, "Sugar", ...others]
console.log(chaat)

const orignal = [1,2,3]
const copy = [...orignal]
copy.push(4)
console.log(orignal)
console.log(copy)

const user = {
    name: "shareel",
    role : "guest",
}

const updatedUser = {
    ...user, role  : "Admin"
}

console.log(updatedUser)


const cart = {
  id: 555,
  total: 1200,
  items: ["Laptop", "Keyboard"]
};

// --- WRITE YOUR CODE BELOW ---
const updatedCart = {
    ...cart , items : [...cart.items , "Mouse"]
}

console.log(updatedCart)

// Expected Output: 
// { id: 555, total: 1200, items: ["Laptop", "Keyboard", "Mouse"] }