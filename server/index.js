// ----- npm libs ----- //
const express = require('express');
const app = express();

const logger = require('morgan');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// ----- include routes ----- //
const notesAPIRoutes = require('./routes/notesAPI');

// ----- include config files ----- //
const config = require('./config/config.js');





// ----- main code ----- //

// db connection
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@fg-napoleon-it-cbxny.mongodb.net/test?retryWrites=true`, config.db.options);
mongoose.set('debug', true);



// middleware
app.use(logger('combined'));
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);



// routes
app.use('/api', notesAPIRoutes);

// 404 error handker
app.use( (req, res) => {
	res.status(404).send('Invalid query');
});


// start server
mongoose.connection
	.once('open', () => {
		console.log(`Mongoose - successful connection ...`);
		app.listen(
			config.server.port,
			() => console.log(`Server start on port ${config.server.port} ...`)
		);
	})
	.on('error', error => console.warn(error));