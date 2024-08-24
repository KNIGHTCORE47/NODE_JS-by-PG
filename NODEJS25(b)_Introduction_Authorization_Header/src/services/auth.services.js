import JWT from 'jsonwebtoken'

const secretKey = "G#2L9nBq4tFy$eJr3vLpKq8wMxCxRjBhYm4pRsTjE"

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