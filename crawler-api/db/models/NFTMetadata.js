const DataTypes = require('sequelize')

module.exports = {
  table: 'nft_metadata',
  fields: {
    token_id: DataTypes.STRING,
    nft_metadata: DataTypes.JSONB,
    contract_decimals: DataTypes.STRING,
    contract_name: DataTypes.STRING,
    contract_address: DataTypes.STRING,
    contract_ticker_symbol: DataTypes.STRING,
    // supports_erc: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    type: DataTypes.STRING,
    tx_hash: DataTypes.STRING
  }
}