const product = {}
const models = require('../models/index.model.js')

product.getAll = async (req, res) => {
    try {
        const result = await models.product.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.status(200).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

product.addData = async (req, res) => {
    try {
        const object = await (req.body)
        object.image_product = req.file.path
        const result = await models.product.create(object)
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
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
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

product.removeData = async (req, res) => {
    try {
        const result = await models.product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

module.exports = product