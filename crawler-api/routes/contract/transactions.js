const request = require("../../helpers/request")

/* GET users listing. */
const route = async function(req, res) {
  const { address, chainId } = req.params

  const get = await request.get(`address/${address}/transactions_v2`, chainId)

  res.send({ ...get.data });
}

module.exports = route;