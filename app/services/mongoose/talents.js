const Talents = require('../../api/v1/talents/model')
const { checkingImage } = require('./images')

// import custom error not found dan bad request
const { BadRequest, NotFound } = require('../../errors')

const getTalents = async (req) => {
  const { keyword } = req.query
  let condition = {}

  if (keyword) {
    condition = {
      ...condition,
      name: {
        $regex: keyword,
        $options: 'i',
      },
    }
  }

  const result = await Talents.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id name role image')

  return result
}

const createTalents = async (req) => {
  const { name, role, image } = req.body

  await checkingImage(image)

  const check = await Talents.findOne({ name })
  if (check) {
    throw new BadRequest('Nama sudah ada')
  }

  const result = await Talents.create({
    name,
    role,
    image,
  })

  return result
}

const getOneTalents = async (req) => {
  const { id } = req.params

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id name role image')

  if (!result) {
    throw new NotFound('Talent tidak ditemukan')
  }

  return result
}

const updateTalents = async (req) => {
  const { id } = req.params
  const { name, role, image } = req.body

  await checkingImage(image)

  const check = await Talents.findOne({
    name: name,
    _id: {
      $ne: id,
    },
  })
  if (check) {
    throw new NotFound('Nama suda ada')
  }

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    {
      name,
      role,
      image,
    },
    { new: true, runValidators: true }
  )

  if (!result) {
    throw new NotFound('Talent tidak ditemukan')
  }

  return result
}

const deleteTalents = async (req) => {
  const { id } = req.params
  const result = await Talents.findOneAndDelete({ _id: id })

  if (!result) {
    throw new NotFound('Talent tidak ditemukan')
  }

  return result
}

const checkingTalent = async (id) => {
  const result = await Talents.findOne({ _id: id })

  if (!result) {
    throw new NotFound('Talent tidak ditemukan')
  }

  return result
}

module.exports = {
  getTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalent,
}
