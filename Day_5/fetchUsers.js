const fetchUser = async()=>{
    console.log('1. fetching user')
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const data = await response.json()
        const {name, address : {city}} = data

        const message = `User ${name} live in ${city} city`

        console.log(message)
    } catch (error) {
        console.log(`Failed to fetch user:  ${error}`)
    }

    console.log('function finished')
}

fetchUser()