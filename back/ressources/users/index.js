const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
	registerRoute,
	authenticateRoute,
	getUserInfoRoute,
} = require('./users.routes')

router.post('/register', registerRoute)
router.post('/authenticate', authenticateRoute)
router.get('/me', passport.authenticate('jwt', { session: false }), getUserInfoRoute)

module.exports = router