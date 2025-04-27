const NotFound = (req, res) => {
  res.status(400).send({ message: 'Route does not exist' })
}

module.exports = NotFound
