const Users = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizer/model')
const { BadRequest, NotFound } = require('../../errors')

const createOrganizer = async (req) => {
  const { organizer, email, password, confirmPassword, name, role } = req.body

  if (password !== confirmPassword) {
    throw new BadRequest('Password tidak cocok')
  }

  const result = await Organizer.create({
    organizer,
  })

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  })

  delete users._doc.password

  return users
}

const createUser = async (req, res) => {
  const { email, password, confirmPassword, name, role } = req.body
  if (password !== confirmPassword) {
    throw new BadRequest('Password tidak cocok')
  }

  const users = await Users.create({
    email,
    name,
    password,
    organizer: req.user.organizer,
    role,
  })

  delete users._doc.password

  return users
}

module.exports = {
  createOrganizer,
  createUser,
}
