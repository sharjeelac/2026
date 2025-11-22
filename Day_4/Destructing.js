const colors = ['Blue', "Green" , "Red"]
const [primary, , tertiary] = colors;

console.log(primary,tertiary)

const user = {
    id : 1,
    name : "sharjeel",
    role : "Admin"
}

const {name, role} = user
console.log(name, role)

const settings = {
    theme : "Dark"
}

const {theme, font = "16px"} = settings
console.log(theme, font)

const employee = {
  id: 101,
  info: {
    fullName: "John Doe",
    contact: {
      email: "john@example.com",
      phone: "555-0199"
    }
  }
};

const {
    info : {
        fullName,
        contact : {
            email
        }
    }
} = employee

console.log(fullName, email)

let a = 'Oil'
let b = 'water'

const userProfile = {
    username : 'Guest'
}

const {username, isMember = "Guest"} = userProfile 
console.log(username, isMember)


const person = {
  name: "Sarah",
  address: {
    city: "New York",
    zip: 10001
  },
  hobbies: ["Reading", "Hiking", "Coding"]
};

// YOUR CODE HERE
const {address : {city} } = person
const {hobbies} = person
hikingHobby = hobbies[1]

console.log(city); // Should print "New York"
console.log(hikingHobby); // Should print "Hiking"


const response = {
  data: {
    coordinates: { lat: 33.68, lng: 73.04 },
    tags: ["React", "JavaScript", "Node"]
  }
};

// --- WRITE YOUR CODE BELOW ---
const {data : {
    coordinates : {
        lat
    }, tags : [firstTag, secondTag, thirdTag]
}} = response

// Expected Output:
console.log(lat); // 33.68
console.log(firstTag); // "React"