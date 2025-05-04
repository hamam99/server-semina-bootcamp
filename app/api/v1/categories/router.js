const express = require('express')
const router = express()
const { create, index, find, update, destroy } = require('./controller')
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth')

router.get(
  '/categories',
  authenticateUser,
  authorizeRoles('organizer', 'admin'),
  index
)
router.get(
  '/categories/:id',
  authenticateUser,
  authenticateUser,
  authorizeRoles('organizer', 'admin'),
  find
)

router.put(
  '/categories/:id',
  authenticateUser,
  authenticateUser,
  authorizeRoles('organizer', 'admin'),
  update
)
router.delete(
  '/categories/:id',
  authenticateUser,
  authenticateUser,
  authorizeRoles('organizer', 'admin'),
  destroy
)
router.post(
  '/categories',
  authenticateUser,
  authenticateUser,
  authorizeRoles('organizer', 'admin'),
  create
)

module.exports = router
