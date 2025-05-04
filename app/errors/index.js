const BadRequest = require('./bad-request')
const NotFound = require('./not-found')
const CustomAPIError = require('./custom-api-error')
const UnAuthenticated = require('./unauthenticated')
const UnAuthorized = require('./unauthorized')
module.exports = {
  BadRequest,
  NotFound,
  CustomAPIError,
  UnAuthenticated,
  UnAuthorized,
}
