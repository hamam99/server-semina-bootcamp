const express = require('express')
const router = express()
const { create, index, find, update, destroy } = require('./controller')
const { authenticateUser } = require('../../../middlewares/auth')

router.use(authenticateUser)
router.get('/categories', index)
router.get('/categories/:id', find)

router.put('/categories/:id', update)
router.delete('/categories/:id', destroy)
router.post('/categories', create)

module.exports = router
