const express = require("express");
const routing = express.Router();
const category = require("./routes/category.routes")

routing.use('/category', category)
routing.use('/category/*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

routing.use('*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

module.exports = routing