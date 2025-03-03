const Categories = require('../../api/v1/categories/model')
const { BadRequest } = require('../../errors')

const getAllCategoris = async () => {
  const result = await Categories.find()
  return result
}

const createCategory = async (req) => {
  const { name } = req.body
  const check = await Categories.findOne({ name })

  if (check) {
    throw new BadRequest('Category already exists')
  }

  const result = await Categories.create({
    name,
  })

  return result
}

module.exports = {
  getAllCategoris,
  createCategory,
}
