const orm = require('../configs/db.configs')
const { DataTypes } = require("sequelize")

module.exports = orm.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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