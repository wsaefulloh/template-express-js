const category = {}
const models = require('../models/index.model.js')

category.getAll = async (req, res) => {
    try {
        const result = await models.category.findAll({
            order: [["name_category", "ASC"]]
        });
        res.status(200).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

category.addData = async (req, res) => {
    try {
        const object = await (req.body)
        const result = await models.category.create(object)
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
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
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

category.removeData = async (req, res) => {
    try {
        const result = await models.category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

module.exports = category