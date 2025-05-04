const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require('../config')

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  })

  return token
}

const isJwtValid = ({ token }) => {
  try {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded
  } catch (err) {
    return false
  }
}

const isTokenValid = (token) => {
  const decoded = jwt.verify(token, jwtSecret)
  return decoded
}

module.exports = {
  createJwt,
  isJwtValid,
  isTokenValid,
}
