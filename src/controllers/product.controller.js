const product = {}
const models = require('../models/index.model.js')
const respone = require("../helpers/respone.helper")

product.getAll = async (req, res) => {
    try {
        const result_product = await models.product.findAll({
            order: [["createdAt", "DESC"]]
        });
        return respone(res, 200, result_product)
    } catch (err) {
        return respone(res, 500, err)
    }
}

product.addData = async (req, res) => {
    try {
        const object = await (req.body)
        object.image_product = req.file.path
        const result = await models.product.create(object)
        return respone(res, 201, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

product.updateData = async (req, res) => {
    try {
        const object = await (req.body)

        const result = await models.product.update(object, {
            where: {
                id: object.id
            }
        })
        return respone(res, 201, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

product.removeData = async (req, res) => {
    try {
        const result = await models.product.destroy({
            where: {
                id: req.params.id
            }
        })
        return respone(res, 200, result)
    } catch (err) {
        return respone(res, 500, err)
    }
}

module.exports = product