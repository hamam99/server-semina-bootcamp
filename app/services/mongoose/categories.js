const Categories = require('../../api/v1/categories/model')
const { BadRequest, NotFound } = require('../../errors')

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

const getOneCategories = async (req) => {
  const { id } = req.params
  const result = await Categories.findOne({
    _id: id,
  })

  if (!result) throw new NotFound('Tidak ada kategori dengan id :' + id)

  return result
}

const updateCategories = async (req) => {
  const { id } = req.params
  const { name } = req.body

  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
  })

  if (check) throw new BadRequest('Kategori duplikat dengan id :' + check.id)

  const result = await Categories.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!result) throw new NotFound('Tidak ada kategori dengan id :' + id)

  return result
}

const deleteCategories = async (req) => {
  const { id } = req.params

  const check = await Categories.findOne({
    _id: id,
  })

  if (!check) throw new BadRequest('Tidak ada kategori dengan id :' + id)

  const result = await Categories.findByIdAndDelete(id)
  return result
}

const checkingCategory = async (id) => {
  const result = await Categories.findOne({ _id: id })

  if (!result) {
    throw new NotFound('Category tidak ditemukan')
  }

  return result
}

module.exports = {
  getAllCategoris,
  createCategory,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategory,
}
