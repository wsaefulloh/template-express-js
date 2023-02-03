const user = {}
const models = require('../models/index.model.js')
const bcr = require("bcrypt")
const passwordHash = require('../helpers/hash.helper')
const { createToken, verifyToken } = require('../helpers/token.helper')
const jwt = require("jsonwebtoken")
const respone = require("../helpers/respone.helper")


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
            return respone(res, 200, result)
        } else {
            return respone(res, 401, "Sorry Username and Password Wrong!")
        }

    } catch (err) {
        return respone(res, 500, err)

    }
}

user.addData = async (req, res) => {
    try {
        const availableUsername = await models.user.findAll({
            where: { username: req.body.username },
        });

        let checkSpace = (req.body.username).split(' ')

        if (availableUsername.length != 0) {
            return respone(res, 500, "Username Already Use")
        } else if (checkSpace.length != 1) {
            return respone(res, 500, "Your Username Containing Unavailable Character")
        }
        else {
            const passHash = await passwordHash(req.body.password)
            const object = await (req.body)
            object.password = passHash
            const result = await models.user.create(object)
            return respone(res, 201, result)
        }

    } catch (err) {
        return respone(res, 500, err)
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
            return respone(res, 201, result)
        } else {
            return respone(res, 500, "Your Old Password is Wrong")
        }
    } catch (err) {
        return respone(res, 500, err)
    }
}

module.exports = user