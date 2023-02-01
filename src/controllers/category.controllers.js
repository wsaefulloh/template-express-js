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
        const data = {
            name_category: object.name_category,
            id: object.id_category
        }
        const result = await models.category.create(data)
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

category.updateData = async (req, res) => {
    try {
        const object = await (req.body)
        const data = {
            name_category: object.name_category,
            id: object.id_category
        }
        const result = await models.update({
            name_category: data.name_category,
        }, {
            where: {
                id: data.id
            }
        })
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

category.removeData = async (req, res) => {
    try {
        const result = await models.destroy({
            where: {
                id: req.params.id_category
            }
        })
        res.status(201).send({ message: "Success", result });
    } catch (err) {
        res.status(500).send({ status: "Error", message: err.message });
    }
}

module.exports = category