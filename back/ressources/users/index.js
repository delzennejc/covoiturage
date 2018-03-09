const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
	registerRoute,
	authenticateRoute,
	getUserInfoRoute,
	getUsersRoute,
} = require('./users.routes')

router.get('/', passport.authenticate('jwt', { session: false }), getUsersRoute)
router.get('/me', passport.authenticate('jwt', { session: false }), getUserInfoRoute)
router.post('/register', registerRoute)
router.post('/authenticate', authenticateRoute)

module.exports = router