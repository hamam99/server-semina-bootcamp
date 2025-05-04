const UnAuthenticated = require('../errors/unauthenticated')
const { isTokenValid } = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
  try {
    let token
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]
    }

    if (!token) {
      throw new UnAuthenticated('Token tidak ditemukan')
    }

    const payload = isTokenValid(token)
    if (!payload) {
      throw new UnAuthenticated('Token tidak valid')
    }
    req.user = {
      email: payload.email,
      name: payload.name,
      role: payload.role,
      id: payload.userId,
      organizer: payload.organizer,
      token,
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticateUser,
}
