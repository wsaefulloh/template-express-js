const category = {}
const models = require('../models/index.model.js')
const respone = require("../helpers/respone.helper")

category.getAll = async (req, res) => {
    try {
        const result = await models.category.findAll({
            order: [["name_category", "ASC"]]
        });
        return respone(res, 200, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

category.addData = async (req, res) => {
    try {
        const object = await (req.body)
        const result = await models.category.create(object)
        return respone(res, 201, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

category.updateData = async (req, res) => {
    try {
        const object = await (req.body)
        const result = await models.category.update(object, {
            where: {
                id: object.id
            }
        })
        return respone(res, 201, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

category.removeData = async (req, res) => {
    try {
        const result = await models.category.destroy({
            where: {
                id: req.params.id
            }
        })
        return respone(res, 200, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

module.exports = category