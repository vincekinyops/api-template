const DataTypes = require('sequelize')

module.exports = {
  table: 'person',
  fields: {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }
}