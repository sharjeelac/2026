const fetchingUser = async()=>{
    console.log('1. Intilizing...')
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()

        console.log(data)

        const [firstUser] = data

        const adminUser = {...firstUser, role : "SuperAdmin"}

        const {name , company : {name : companyName}, role} = adminUser

        console.log(`Success : ${name} is now ${role} of the ${companyName}`)
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

fetchingUser()