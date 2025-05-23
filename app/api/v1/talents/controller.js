const { StatusCodes } = require('http-status-codes')
const {
  createTalents,
  getTalents,
  getOneTalents,
  deleteTalents,
  updateTalents,
} = require('../../../services/mongoose/talents')

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req)
    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const index = async (req, res, next) => {
  try {
    const result = await getTalents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req)
    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  index,
  find,
  destroy,
  update,
}
