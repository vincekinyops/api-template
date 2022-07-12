const axios = require("axios")

const defaultChainId=80001 // Polygon-Mumbai Chain Id
module.exports = {
  get: (route, chainId) => {
    return new Promise(async (resolve) => {
      try {
        const response = await axios.get(`https://api.covalenthq.com/v1/${chainId || defaultChainId}/${route}/?&key=${process.env.COVALENT_API_KEY}`)
        resolve(response)
      } catch (e) {
        resolve({ data: e?.response?.data })
      }
    })
  }
}