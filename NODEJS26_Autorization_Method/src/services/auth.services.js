import JWT from 'jsonwebtoken'

const secretKey = "aB3dE5fG7hI9jK1lM2nO4pQ6rS8tU0vW3xY5zA7bC9dE1fG3hI5jK7lM9nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW3xY5zA7bC9dE1fG3hI5jK7lM9nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW3xY5zA7bC9"

//JWT token assignment
function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
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