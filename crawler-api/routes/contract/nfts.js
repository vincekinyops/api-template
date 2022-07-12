const request = require("../../helpers/request")

/* GET users listing. */
const route = async function(req, res) {
  const { address } = req.params

  const get = await request.get(`tokens/${address}/nft_token_ids`)
  try {
    const nftItems = get?.data?.data?.items 

    const transactions = nftItems.map((nft) => {
      return request.get(`tokens/${address}/nft_transactions/${nft.token_id}`) 
    })
    const txs = await Promise.all(transactions)
    const nft_txs = txs.map((item, i) => {
      return {...item?.data?.data?.items[0], ...nftItems[i]}
    })

    const metadata = nftItems.map((nft) => {
      return request.get(`tokens/${address}/nft_metadata/${nft.token_id}`) 
    })
    const metas = await Promise.all(metadata)
    const nft_metas = metas.map((item, i) => {
      return {...item?.data?.data?.items[0], ...nftItems[i]}
    })
    

    res.send({ nft_txs, nft_metas });
  } catch (e) {
    res.send({ error: e.response?.data });
  }
}

module.exports = route;