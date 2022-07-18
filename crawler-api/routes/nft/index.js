const request = require("../../helpers/request")
var db = require('../../db');
const { AddressNFTTokens, NFTTransactions, NFTMetadata } = db.models

/* GET users listing. */
const getNFTTxByTokenId = async function(req, res) {
  const { contract, tokenid, chainId } = req.params

  const get = await request.get(`tokens/${contract}/nft_transactions/${tokenid}`, chainId)

  res.send({ ...get.data });
}

const getNFTTxByAddress = async function(req, res) {
  const { contract, chainId } = req.params

  const tokens = await AddressNFTTokens.findAll({ raw: true, where: { contract_address: contract }, attributes: ['contract_address', 'token_id'] })
  
  if (tokens && tokens.length) {
    const data = await Promise.all(tokens.map(async (i) => {
      const { data } = await request.get(`tokens/${contract}/nft_transactions/${i.token_id}`, chainId)
      
      return new Promise((resolve) => resolve({...i, ...data}))
    }))

    const a = data.map((j) => {
      const data = { token_id: j.token_id, address: j.contract_address, items: j.data.items }
      return data
    })

    for await (const i of a) {

      for await (const item of i.items) {

        if (item.nft_transactions.length) {
          const saved = item.nft_transactions.map(async (tx) => {
            const { contract_decimals, contract_name, contract_ticker_symbol, contract_address, type } = item
            const [saved, _created] = await NFTTransactions.findOrCreate({
              where: { contract_address: item.contract_address, token_id: i.token_id, tx_hash: tx.tx_hash },
              defaults: {
                nft_tx_data: tx,
                contract_decimals, 
                contract_name,
                contract_ticker_symbol,
                contract_address,
                type
              }
            })

            return Promise.resolve({saved})
          })

          await Promise.all(saved)
        }
      }
    }

    return res.send(a)
  }
  
  return res.status(400).send({ message: 'No NFTs for this contract '})
  // const get = await request.get(`tokens/${contract}/nft_transactions/${tokenid}`, chainId)

  // res.send({ ...get.data });
}

const getNFTMetadataByAddress = async function(req, res) {
  const { contract, chainId } = req.params

  const tokens = await AddressNFTTokens.findAll({ raw: true, where: { contract_address: contract }, attributes: ['contract_address', 'token_id'] })
  
  if (tokens && tokens.length) {
    const data = await Promise.all(tokens.map(async (i) => {
      const { data } = await request.get(`tokens/${contract}/nft_metadata/${i.token_id}`, chainId)
      
      return new Promise((resolve) => resolve({...i, ...data}))
    }))

    const a = data.map((j) => {
      const data = { token_id: j.token_id, address: j.contract_address, items: j.data.items }
      return data
    })

    for await (const i of a) {

      for await (const item of i.items) {

        if (item.nft_data.length) {
          const { contract_decimals, contract_name, contract_ticker_symbol, contract_address, type } = item
          const saved = item.nft_data.map(async (nftData) => {
            const [saved, _created] = await NFTMetadata.findOrCreate({
              where: { contract_address: item.contract_address, token_id: i.token_id },
              defaults: {
                nft_metadata: nftData,
                contract_decimals, 
                contract_name,
                contract_ticker_symbol,
                contract_address,
                type
              }
            })

            return Promise.resolve({saved})
          })

          await Promise.all(saved)
        }
      }
    }

    return res.send(a)
  }
  
  return res.status(400).send({ message: 'No NFTs for this contract '})
  // const get = await request.get(`tokens/${contract}/nft_transactions/${tokenid}`, chainId)

  // res.send({ ...get.data });
}

module.exports = {
  getNFTTxByTokenId,
  getNFTTxByAddress,
  getNFTMetadataByAddress
};