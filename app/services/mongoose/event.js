const Event = require('../../api/v1/events/model')
const { NotFound, BadRequest } = require('../../errors')
const { checkingImage } = require('./images')
const { checkingTalent } = require('./talents')
const { checkingCategory } = require('./categories')

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query

  let condition = {}

  if (keyword) {
    condition = {
      ...condition,
      title: {
        $regex: keyword,
        $options: 'i',
      },
    }
  }

  if (category) {
    condition = {
      ...condition,
      category: category,
    }
  }

  if (talent) {
    condition = {
      ...condition,
      talent: talent,
    }
  }

  const result = await Event.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name',
      },
    })
  return result
}

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body

  await checkingImage(image)
  await checkingCategory(category)
  await checkingTalent(talent)

  const check = await Event.findOne({ title })
  if (check) {
    throw new BadRequest('Nama event sudah ada')
  }

  const result = await Event.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  })

  return result
}

const getOneEvents = async (req) => {
  const { id } = req.params

  const result = await Event.findOne({ _id: id })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name',
      },
    })
    .select('_id name role image')

  if (!result) {
    throw new NotFound('Event tidak ditemukan')
  }

  return result
}

const updateEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body
  const { id } = req.params

  await checkingImage(image)
  await checkingCategory(category)
  await checkingTalent(talent)

  const checkEvent = await Event.findOne({ _id: id })
  if (!checkEvent) {
    throw new NotFound('Event tidak ditemukan dengan id :' + id)
  }

  const check = await Event.findOne({
    title,
    _id: {
      $ne: id,
    },
  })

  if (check) {
    throw new BadRequest('Nama event sudah ada')
  }

  const result = await Event.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  )

  if (!result) {
    throw new NotFound('Event tidak ditemukan')
  }

  return result
}

const deleteEvents = async (req) => {
  const { id } = req.params

  const check = await Event.findOne({
    _id: id,
  })

  if (!check) throw new BadRequest('Tidak ada event dengan id :' + id)

  const result = await Event.findByIdAndDelete(id)
  return result
}

module.exports = {
  createEvents,
  updateEvents,
  deleteEvents,
  getAllEvents,
  getOneEvents,
}
