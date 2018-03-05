const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { secret } = require('./main')
const { users } = require('../ressources/users/models')

module.exports = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('token'),
		secretOrKey: secret,
		ignoreExpiration: true
	}

	passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
		try {
			const user = await users(jwt_payload._id)
			done(null, user)
		} catch (error) {
			done(null, false)
			throw error
		}
	}))
}