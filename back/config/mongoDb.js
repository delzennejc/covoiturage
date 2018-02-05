const mongoose = require('mongoose')

const { mongoDbName, mongodbUrl } = require('./main')

mongoose.connect(mongodbUrl)
mongoose.Promise = global.Promise;

module.exports = {
	ObjectID: mongoose.Types.ObjectId
}