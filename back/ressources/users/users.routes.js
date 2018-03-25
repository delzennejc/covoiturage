const { isEmpty } = require('lodash')

const {
	users,
	registerUser,
	authenticateUser,
} = require('./models')

const registerRoute = async (req, res) => {
	try {
		const { email, password } = req.body
		if (email && password) {
			const user = await registerUser(req.body)
			res.json({ user })
		}
		else res.status(400).json({ message: 'email and password are required' })
	} catch (error) {
		res.status(400).json({ message: String(error) })
	}
}

const authenticateRoute = async (req, res) => {
	try {
		const { email, password } = req.body
		if (email && password) {
			const jwt = await authenticateUser({ email, password })
			if (jwt) res.json({ token: jwt })
			else res.status(400).json({ message: `email or password don't match` })
		}
		else res.status(400).json({ message: 'email and password are required' })
	} catch (error) {
		res.status(400).json({ message: String(error) })
	}
}

const getUserInfoRoute = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(400).json({ message: String(error) })
	}
}

const getUsersRoute = async (req, res) => {
	try {
		const allUsers = await users()
		res.json(allUsers)
	} catch (error) {
		res.status(400).json({ message: String(error) })
	}
}

module.exports = {
	registerRoute,
	authenticateRoute,
	getUserInfoRoute,
	getUsersRoute,
}