const mongoose = require('mongoose')

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

const TravelsModel = mongoose.model('travel', TravelsSchema)

module.exports = {
	TravelsModel
}