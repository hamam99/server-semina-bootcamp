const Images = require('../../api/v1/images/model')
const { NotFound } = require('../../errors')

const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`
  return result
}

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  })

  return result
}

const checkingImage = async (image) => {
  const result = await Images.findOne({ _id: image })

  if (!result) {
    throw new NotFound('Image tidak ditemukan')
  }

  return result
}

module.exports = {
  createImages,
  generateUrlImage,
  checkingImage,
}
