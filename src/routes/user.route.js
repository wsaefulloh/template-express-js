const express = require("express");
const routing = express.Router();
const ctrl = require("../controllers/user.controller");
const checkToken = require("../middlewares/auth.validation.middleware")

//CREATE --> POST
routing.post("/", ctrl.addData);

//READ --> GET
routing.get("/login", ctrl.login);

//UPDATE --> PUT
routing.put("/", checkToken(), ctrl.updateData)

module.exports = routing;