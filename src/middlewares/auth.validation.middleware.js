const jwt = require("jsonwebtoken")
const { verifyToken } = require("../helpers/token.helper")

const checkToken = () => {
    return (req, res, next) => {
        const access_token = req.headers.authorization.split(" ")[1];

        if (!access_token) {
            res.status(401).send({ status: "Error", message: "You Must Login to Access this Service" });
        }

        const resultVerify = verifyToken(access_token)
        console.log(resultVerify)

        if (resultVerify.username) {
            return next()
        } else {
            res.status(500).send({ status: "Error", message: "Token Unavailable" });
        }
    }
}

module.exports = checkToken
