const { default: mongoose } = require('mongoose')
const Categories = require('./model')
const {
  getAllCategoris,
  createCategory,
} = require('../../../services/mongoose/categories')

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req)
    res.status(201).json({
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
    const result = await getAllCategoris().select('_id name')
    res.status(201).json({
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

    const result = await Categories.findOne({ _id: id })

    if (!result) {
      return res.status(404).json({ message: 'Id categories tidak ditemukan' })
    }

    res.status(200).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body

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
    res.status(201).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Categories.findByIdAndDelete(id)
    res.status(201).json({
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
