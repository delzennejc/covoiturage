const express = require('express')
const router = express.Router()

const {
	registerRoute,
	authenticateRoute,
} = require('./users.routes')

router.post('/register', registerRoute)
router.post('/authenticate', authenticateRoute)

module.exports = router