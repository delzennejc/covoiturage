const { ObjectID } = require('../../../config/mongoDb')
const { TravelsModel } = require('./types')

const removedFields = { user: 0, __v: 0 }

const travels = async (id, userId = null) => {
	if (id) {
		return await TravelsModel
			.findOne({ _id: new ObjectID(id) }, removedFields)
			.populate('driver')
			.populate('travelers')
	}
	return await TravelsModel
		.find({}, removedFields)
		.populate('driver')
		.populate('travelers')
}

const createTravel = async (trav) => {
	const newtravel = new TravelsModel(trav)
	await newtravel.save()
	const createdTravel = await travels(newtravel._id)
	return createdTravel
}

const updateTravel = async (id, trav, userId = null) => {
	return await TravelsModel.findOneAndUpdate(
		{},
		trav,
		{ new: true, fields: removedFields }
	)
}

module.exports = {
	travels,
	createTravel,
	updateTravel
}