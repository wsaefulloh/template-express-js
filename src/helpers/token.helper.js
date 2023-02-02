const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")

const createToken = async (username, password) => {
    try {
        const payload = {
            username: username,
            password: password
        }
        const token = jwt.sign(payload, process.env.JWT_KEYS)
        const result = {
            token: token,
            message: 'Login Success, Welcome to Our Application'
        }
        return result

    } catch (error) {
        throw error
    }
}

const verifyToken = (token) => {
    try {
        const result = jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                throw err
            }
            const username = decode.username
            const password = decode.password
            return { username, password }
        })
        return result
    } catch (error) {
        throw error
    }
}

module.exports = { createToken, verifyToken }