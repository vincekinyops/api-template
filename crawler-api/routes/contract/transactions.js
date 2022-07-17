const request = require("../../helpers/request")
var db = require('../../db');
const { Contract } = db.models

/* GET users listing. */
const route = async function(req, res) {
  const { address, chainId } = req.params

  const { data: result } = await request.get(`address/${address}/transactions_v2`, chainId)
  console.log('111', result)
  let data = {}

  try {
    if (result.data) {
      data = {
        contract_address: address,
        quote_currency: result.data.quote_currency,
        chain_id: chainId
      }
  
      if (result.data.items.length) {
        const saved = result.data.items.map((i) => {
          
          return Contract.create({
            ...data, tx_data: i
          })
        })
  
        const txs = await Promise.all(saved)
  
        return res.status(200).send(txs)
      }
  
      return res.status(200).send(data)
    }
    return res.status(404).send({ message: 'No data for given parameters' })
  } catch (error) {
    return res.status(500).send(JSON.stringify(error))
  }
}

module.exports = route;