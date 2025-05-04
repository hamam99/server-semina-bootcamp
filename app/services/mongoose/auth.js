const { BadRequest, UnAuthorized } = require('../../errors')
const Users = require('../../api/v1/users/model')
const { createTokenUser, createJwt } = require('../../utils')

const signIn = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequest('Email atau password tidak boleh kosong')
  }

  const result = await Users.findOne({ email })

  if (!result) {
    throw new UnAuthorized('Invalid credential')
  }

  const isPasswordValid = await result.comparePassword(password)

  if (!isPasswordValid) {
    throw new UnAuthorized('Invalid credential')
  }

  const token = createJwt({
    payload: createTokenUser(result),
  })
  return token
}

module.exports = {
  signIn,
}
