const orm = require('../configs/db.configs')
const { DataTypes } = require("sequelize")

let category = orm.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name_category: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true
}
)

module.exports = category