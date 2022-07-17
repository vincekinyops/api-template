const DataTypes = require('sequelize')

module.exports = {
  table: 'contracts',
  fields: {
    chain_id: DataTypes.STRING,
    contract_address: DataTypes.STRING,
    tx_data: DataTypes.JSONB,
    quote_currency: DataTypes.STRING
  }
}