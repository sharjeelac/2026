const name = "Sharjeel"
const language = 'Javascript'

const sentence = `I am ${name} and i am learning ${language}`

console.log(sentence)

const list = `
List :
Milk
Eggs
Bread
`
console.log(list)


const price = 3;
const quantity = 6;

console.log(`The Total cost is ${price * quantity}`)

const isMember = false

console.log(`Shiping Cost ${isMember ? '$0.00' : '$0.50'}`)

const role = 'Admin'
const isActive = true;

const htmlCard = `
    <div>
        <h2>Name : ${name}</h2>
        <P>Role : ${role}</P>
        <p>Status : ${isActive ? "Online" : "Offline"}</p>
    </div>
`

console.log(htmlCard)