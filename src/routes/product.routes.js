const express = require("express");
const routing = express.Router();
const ctrl = require("../controllers/product.controllers");
// const validate = require("../middleware/validate")
const upload = require("../middlewares/upload.middleware")

//CREATE --> POST
routing.post("/", upload.single('image_product'), ctrl.addData);

//READ --> GET
routing.get("/", ctrl.getAll);

//UPDATE --> PUT
routing.put("/", upload.single('image_product'), ctrl.updateData)

//DELETE --> DELETE
routing.delete("/:id", ctrl.removeData)

module.exports = routing;