const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const app = express()

// import configs
const swaggerSpecs = require('./config/swagger')

// import ressources
const travelsRessource = require('./ressources/travels')
const usersRessource = require('./ressources/users')

// express config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(passport.initialize())

// initialize configs
require('./config/passport')(passport)
require('./config/mongoDb')

// SWAGGER API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// HOME ROUTE
const homeRoute = (req, res) => {
	res.json({ test: 'welcome to the home route, authenticate to use the api.' })
}
app.get('/api/v1/', homeRoute)

// ALL RESSOURCES
app.use('/api/v1/travels', travelsRessource)
app.use('/api/v1/users', usersRessource)

app.listen(3000, () => console.log('http://localhost:3000'))