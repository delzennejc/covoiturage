const { ObjectID } = require('../../../config/mongoDb')
const { TravelsModel } = require('./types')

const removedFields = { user: 0, __v: 0 }

const travels = async (id, userId = null) => {
	if (id) return await TravelsModel.findOne({ _id: new ObjectID(id) }, removedFields)
	return await TravelsModel.find({}, removedFields)
}

const createTravel = async (trav) => {
	const newtravel = new TravelsModel(trav)
	await newtravel.save()
	return newtravel
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