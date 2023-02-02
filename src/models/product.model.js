const orm = require('../configs/db.configs')
const { DataTypes } = require("sequelize")
const category = require('./category.model')

let product = orm.define("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name_product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price_product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand_product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_product: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  timestamps: true
}
)

product.belongsTo(category, {
  foreignKey: 'id_category',
})

module.exports = product