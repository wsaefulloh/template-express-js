require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../configs/db.config.js")[env];

const sequelize = require("sequelize");
const orm = new sequelize({
  username: dbConfig.username,
  database: dbConfig.database,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.orm = orm;
db.sequelize = sequelize;

db.user = require("./users.model.js")(orm, sequelize);
db.category = require("./category.model.js")(orm, sequelize);
db.product = require("./product.model")(orm, sequelize);

module.exports = db;
