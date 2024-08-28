import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'

dotenv.config()

const secretKey = process.env.JWT_TOKEN_SECRET_KEY;
const expiresIn = process.env.JWT_TOKEN_EXPIRY_KEY;

function createTokenForUser(user) {
    const paylod = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }
    const token = JWT.sign(paylod, secretKey, { expiresIn })
    return token;
}

function validateToken(token) {
    try {
        const payload = JWT.verify(token, secretKey);
        return payload;
    } catch (error) {
        console.error(error);
        return null; // or throw an error
    }
}

export {
    createTokenForUser,
    validateToken
}