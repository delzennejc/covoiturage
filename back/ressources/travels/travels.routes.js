const { isEmpty } = require('lodash')

const { 
	travels,
	createTravel,
	updateTravel
} = require('./models')

const getTravelsRoute = async (req, res) => {
 try {
	const travelsData = await travels(null, req.user._id)
	if (travelsData) res.json(travelsData)
	else res.status(204).json([])
 } catch (error) {
	 res.status(500).send(error)
 }
}

const getTravelByIdRoute = async (req, res) => {
	try {
		const travelData = await travels(req.params.id, req.user._id)
		if (travelData) res.json(travelData)
		else res.status(404).json({})
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

const createTravelRoute = async (req, res) => {
	try {
		const { driver } = req.body
		if (!driver) res.status(400).json({ message: "driver is required" })
		const newTravelData = await createTravel({ ...req.body })
		if (newTravelData) res.json(newTravelData)
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

const updateTravelByIdRoute = async (req, res) => {
	try {
		if (isEmpty(req.body)) res.status(400).json({ message: "the travel data is required" })
		const updatedTravel = await updateTravel(req.params.id, { ...req.body }, req.user._id,)
		res.json(updatedTravel)
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

module.exports = {
	getTravelsRoute,
	getTravelByIdRoute,
	createTravelRoute,
	updateTravelByIdRoute
}