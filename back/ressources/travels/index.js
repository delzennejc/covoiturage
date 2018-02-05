const express = require('express')
const passport = require('passport')
const router = express.Router()

const {
	getTravelsRoute,
	getTravelByIdRoute,
	createTravelRoute,
	updateTravelByIdRoute,
} = require('./travels.routes')

router.get('/', passport.authenticate('jwt', { session: false }), getTravelsRoute)
router.get('/:id',passport.authenticate('jwt', { session: false }), getTravelByIdRoute)
router.post('/', passport.authenticate('jwt', { session: false }), createTravelRoute)
router.post('/:id', passport.authenticate('jwt', { session: false }), updateTravelByIdRoute)

module.exports = router