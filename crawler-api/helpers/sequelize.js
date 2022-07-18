const axios = require("axios")
// const { Model } = require("sequelize/types")

module.exports = {
  upsert: (model, values, condition, transaction) => {
    return new Promise(async (resolve) => {
      try {
        const obj = await model.findOne({ where: condition })
        if (obj)
          resolve(await obj.update(values, { transaction }))
        resolve(await model.create(values, { transaction }))                    

      } catch (e) {
        resolve({ data: e?.response?.data })
      }
    })
  }
}