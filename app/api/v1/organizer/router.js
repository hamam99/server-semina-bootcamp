const express = require('express')
const router = express()
const { createCMSOrganizer, createCMSUser } = require('./controller')

const { authenticateUser } = require('../../../middlewares/auth')
// router.use(authenticateUser)

router.post('/organizers', createCMSOrganizer)
router.post('/admin', authenticateUser, createCMSUser)

module.exports = router
