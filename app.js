const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

const categoriesRouter = require('./app/api/v1/categories/router')
const imagesRouter = require('./app/api/v1/images/router')

const v1 = '/api/v1/cms'

const notFoundMiddleware = require('./app/middlewares/not-found')
const errorHandlerMiddleware = require('./app/middlewares/handle-error')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the BE world',
  })
})

app.use(v1, categoriesRouter)
app.use(v1, imagesRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
