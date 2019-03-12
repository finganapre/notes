const config = {
	server: {
		port: process.env.port || 8080
	},
	db: {
		user: 'dbAdmin',
		password: process.env.mongoDBPswd || 'Nui5ic',
		options: { useNewUrlParser: true, useCreateIndex: true }
	}
}

module.exports = config;