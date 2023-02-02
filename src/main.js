const express = require("express");
const routing = express.Router();
const category = require("./routes/category.route")
const product = require("./routes/product.route")
const user = require("./routes/user.route")

routing.use('/category', category)
routing.use('/category/*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

routing.use('/product', product)
routing.use('/product/*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

routing.use('/user', user)
routing.use('/user/*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

routing.use('*', (req, res) => {
    res.status(404).send({ status: "Error", message: 'Alamat URL yang anda masukkan salah' });
})

module.exports = routing