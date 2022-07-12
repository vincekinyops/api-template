const request = require("../../helpers/request")

/* GET users listing. */
const route = async function(req, res) {
  const { contract, tokenid, chainId } = req.params

  const get = await request.get(`tokens/${contract}/nft_transactions/${tokenid}`, chainId)

  res.send({ ...get.data });
}

module.exports = route;