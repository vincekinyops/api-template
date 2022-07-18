const request = require("../../helpers/request")
var db = require('../../db');
const { AddressNFTTokens } = db.models

/* GET users listing. */
const route = async function(req, res) {
  const { address } = req.params

  const get = await request.get(`tokens/${address}/nft_token_ids`)

  const t = await db.connection.transaction()
  //return res.send({...get.data})
  try {
    const nftItems = get?.data?.data?.items

    const transactions = nftItems.map(async (nft) => {
      const [saved, _created] = await AddressNFTTokens.findOrCreate({
        where: { token_id: `${nft.token_id}`, contract_address: address },
        defaults: nft,
        transaction: t
      })

      return new Promise((resolve) => resolve(saved))
      //return dbHelper.upsert(AddressNFTTokens, nft, { token_id: nft.token_id }, t)
    })

    // const return request.get(`tokens/${address}/nft_transactions/${nft.token_id}`)

    const txs = await Promise.all(transactions)

    await t.commit()

    return res.send({ nft_token_ids: txs })
    // const nft_txs = txs.map((item, i) => {
    //   return {...item?.data?.data?.items[0], ...nftItems[i]}
    // })

    // const metadata = nftItems.map((nft) => {
    //   return request.get(`tokens/${address}/nft_metadata/${nft.token_id}`) 
    // })
    // const metas = await Promise.all(metadata)
    // const nft_metas = metas.map((item, i) => {
    //   return {...item?.data?.data?.items[0], ...nftItems[i]}
    // })
    

    // res.send({ nft_txs, nft_metas });
  } catch (e) {
    await t.rollback()
    return res.send({ error: e.response?.data });
  }
}

module.exports = route;