const user = {}
const models = require('../models/index.model.js')
const bcr = require("bcrypt")
const passwordHash = require('../helpers/hash.helper')
const { createToken, verifyToken } = require('../helpers/token.helper')
const jwt = require("jsonwebtoken")

user.login = async (req, res) => {
    try {
        const passDB = await models.user.findAll({
            where: { username: req.query.username },
        });
        const passUser = req.query.password
        const check = await bcr.compare(passUser, passDB[0].password)

        console.log(req.query.username)
        if (check) {
            const result = await createToken(req.query.username, passUser)
            res.status(200).send({ message: result.message, token: result.token });
        } else {
            res.status(401).send({ status: "Error", message: "Sorry Username and Password Wrong!" });
        }

    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

user.addData = async (req, res) => {
    try {
        const availableUsername = await models.user.findAll({
            where: { username: req.body.username },
        });
        if (availableUsername.length != 0) {
            res.status(500).send({ status: "Error", message: "Username Already Use" });
        } else {
            const passHash = await passwordHash(req.body.password)
            const object = await (req.body)
            object.password = passHash
            const result = await models.user.create(object)
            res.status(201).send({ message: "Success", result });
        }

    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

user.updateData = async (req, res) => {
    try {
        const access_token = req.headers.authorization.split(" ")[1];
        const resultVerify = verifyToken(access_token)
        const oldPassFromDB = await models.user.findAll({
            where: { username: resultVerify.username },
        });
        const oldPassFromUser = req.body.old_password
        const check = await bcr.compare(oldPassFromUser, oldPassFromDB[0].password)

        if (check) {
            let passHash
            if (req.body.new_password) {
                passHash = await passwordHash(req.body.new_password)
            } else {
                passHash = oldPassFromDB[0].password
            }
            const object = await (req.body)
            object.password = passHash
            delete object.username
            const result = await models.user.update(object, {
                where: {
                    id: oldPassFromDB[0].id
                }
            })
            res.status(201).send({ message: "Success", result });
        } else {
            res.status(500).send({ status: "Error", message: "Your Old Password is Wrong" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

module.exports = user