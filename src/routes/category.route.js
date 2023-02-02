const express = require("express");
const routing = express.Router();
const ctrl = require("../controllers/category.controller");
// const validate = require("../middleware/validate")

//CREATE --> POST
routing.post("/", ctrl.addData);

//READ --> GET
routing.get("/", ctrl.getAll);

//UPDATE --> PUT
routing.put("/", ctrl.updateData)

//DELETE --> DELETE
routing.delete("/:id", ctrl.removeData)

module.exports = routing;