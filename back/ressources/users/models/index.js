const jwt = require('jsonwebtoken')

const { secret } = require('../../../config/main')
const { UserModel } = require('./types')
const { ObjectID } = require('../../../config/mongoDb')

const users = async (id) => {
	return await UserModel.findOne({ _id: new ObjectID(id) })
}

const registerUser = async (infos) => {
	const user = new UserModel(infos)
	await user.save()
	return true
}

const authenticateUser = async (infos) => {
	const user = await UserModel.findOne({ email: infos.email })
	const isSamePassword = await user.comparePasswords(infos)
	if (!user || !isSamePassword) return null
	return `token ${jwt.sign(user.toJSON(), secret, { expiresIn: 10080 })}`
}

module.exports = {
	users,
	registerUser,
	authenticateUser
}