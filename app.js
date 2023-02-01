require("dotenv/config")
const express = require("express");
const server = express();
const main = require('./src/main')

const PORT = process.env.PORT;
const database = require('./src/configs/db.configs');

const morgan = require("morgan");
const path = require("path")
const fs = require("fs")
const cors = require("cors")

server.use(cors())

server.use(morgan("dev"))
let accessLogStream = fs.createWriteStream(path.join("./logs", 'access.log'), { flags: 'a' })
server.use(morgan('combined', { stream: accessLogStream }))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/public", express.static("public"))
server.use(main)

async function init() {
  try {
    await database.authenticate()
    await database.sync({ alter: true })

    server.listen(PORT, () => {
      console.log(`Conection to Database Success`)
      console.log(`Service running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
    process.exit(1)

  }
}

init()