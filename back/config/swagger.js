const swaggerJSDoc = require('swagger-jsdoc');
const options = {
	swaggerDefinition: {
		info: {
			title: 'Kours-up API',
			version: '1.0.0'
		},
		host: 'localhost:3000', // Host (optional)
		basePath: '/api/v1', // Base path (optional)
	},
	apis: ['./routes/ingredients/index.js'],
}
module.exports = swaggerJSDoc(options)
