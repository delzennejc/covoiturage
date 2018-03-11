const mongoose = require('mongoose')
const { ObjectID } = require('../../../config/mongoDb')

const Schema = mongoose.Schema

const TravelsSchema = new Schema({
	_id: {  type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
	meetingPlace: { type: String },
	destination: { type: String },
	meetingSchedule: { type: String },
	createdAt: { type: Date, default: Date.now },
	driver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
	freeSeats: { type: Number },
	travelers: [{
		type: Schema.Types.ObjectId, ref: 'user'
	}]
})

TravelsSchema.pre('save', async function(next) {
	try {
		this.driver = new ObjectID(this.driver)
		this.travelers = this.travelers.map(id => new ObjectID(id))
		next()
	} catch (error) {
		throw error
	}
})
const TravelsModel = mongoose.model('travel', TravelsSchema)

module.exports = {
	TravelsModel
}