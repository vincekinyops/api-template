const DataTypes = require('sequelize')

module.exports = {
  table: 'address_nft_tokens',
  fields: {
    contract_address: DataTypes.STRING,
    contract_decimals: DataTypes.STRING,
    contract_name: DataTypes.STRING,
    contract_ticker_symbol: DataTypes.STRING,
    supports_erc: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    token_id: DataTypes.STRING
  }
}