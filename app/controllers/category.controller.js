const db = require("../models");
const category = db.category;
const Op = db.sequelize.Op;

// Create and Save a new category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.category_name) {
    res.status(400).send({
      message: "category can not be empty!",
    });
    return;
  }

  // Save category in the database
  category
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the category.",
      });
    });
};

// Retrieve all category from the database.
exports.findAll = (req, res) => {
  const category_name = req.query.category_name;
  let condition = category_name
    ? { category_name: { [Op.like]: `%${category_name}%` } }
    : null;

  category
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occured while find category",
      });
    });
};

// Find a single category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  category
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving category with id=" + id,
      });
    });
};

// Update a category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  category
    .update(req.body, {
      where: { id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "category was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update category with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error updating category with id=" + id,
      });
    });
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  category
    .destroy({
      where: { id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "category was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete category with id=" + id,
      });
    });
};

// Delete all category from the database.
exports.deleteAll = (req, res) => {
  category
    .destroy({
      where: {},
      truncate: false,
    })
    .then((result) => {
      res.send({
        message: `${result} category were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while removing all category.",
      });
    });
};
