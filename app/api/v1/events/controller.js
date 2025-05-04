const { default: mongoose } = require('mongoose')
const Events = require('./model')

const { StatusCodes } = require('http-status-codes')
const {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
} = require('../../../services/mongoose/event')

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const find = async (req, res, next) => {
  try {
    const { id } = req?.params

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid ID format',
      })
    }

    const result = await getOneEvents(req)

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Id event tidak ditemukan' })
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
    const result = await updateEvents(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req)
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
