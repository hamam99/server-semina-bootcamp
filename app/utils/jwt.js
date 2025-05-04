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

module.exports = {
  createJwt,
  isJwtValid,
}
