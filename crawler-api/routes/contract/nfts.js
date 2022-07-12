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

    const all = await Promise.all(transactions)
    const nfts = all.map((item) => {
      return item?.data?.data?.items[0]
    })

    res.send({ nfts });
  } catch (e) {
    res.send({ error: e.response?.data });
  }
}

module.exports = route;