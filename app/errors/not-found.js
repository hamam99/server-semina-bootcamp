const CustomAPIError = require('./custom-api-error')
const { StatusCode } = require('http-status-codes')

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCode.NOT_FOUND
  }
}

module.exports = NotFound
