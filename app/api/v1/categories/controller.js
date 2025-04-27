const { default: mongoose } = require('mongoose')
const Categories = require('./model')
const {
  getAllCategoris,
  createCategory,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require('../../../services/mongoose/categories')

const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (error) {
    next(error)
    // if (error.name === 'ValidationError') {
    //   res.status(400).json({
    //     message: error.message,
    //     fields: error.errors,
    //   })
    //   return
    // }
    // res.status(500).json({
    //   message: 'Internal Server Error create',
    // })
  }
}

const index = async (req, res, next) => {
  try {
    const result = await getAllCategoris()
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const find = async (req, res, next) => {
  try {
    const { id } = req.params

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid ID format',
      })
    }

    const result = await getOneCategories(req)

    if (!result) {
      return res.status(404).json({ message: 'Id categories tidak ditemukan' })
    }

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await deleteCategories(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
}
