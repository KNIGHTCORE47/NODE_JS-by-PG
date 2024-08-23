import JWT from 'jsonwebtoken'

const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNDQwNzkwMywiaWF0IjoxNzI0NDA3OTAzfQ.B3DHnsRUvs4V-feKDk0-LEiX5bVMpkmn9Mhr61yzIb8"

//JWT token assignment
function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return JWT.sign(payload, secretKey)
}

function getUser(token) {
    if (!token) return null;
    return JWT.verify(token, secretKey) //Verify the token
}


export {
    setUser,
    getUser
}