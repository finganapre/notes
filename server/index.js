const express = require('express');
const app = express();
const logger = require('morgan');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require("./config/config.js");





// bd :)
const notes = [
	{
		id: '1',
		title: 'first',
		text: 'some text 1',
		date_create: 1513759529,
		date_update: 1513759529
	},
	{ 
		id: '2',
		title: 'next',
		text: 'some text 2',
		date_create: 1513749529,
		date_update: 1513749529
	},
	{ 
		id: '3',
		title: 'third',
		text: 'some text 3',
		date_create: 1523749529,
		date_update: 1523749529
	}
];

// db connection
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@fg-napoleon-it-cbxny.mongodb.net/test?retryWrites=true`, config.db.options);
mongoose.set('debug', true);





// middleware
app.use(logger('combined'));
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);





// routes
app.get('/', (req, res) => {
	res.status(200).send('server working');
});



// get all notes
app.get('/api/notes', (req, res) => {
	res.status(200).send(notes);
});



// add note
app.post('/api/notes', (req, res) => {
	let title = req.body.title;
	let text = req.body.text || '';

	if ( !title ){
		res.status(400).send('The field "title" cannot be empty');
		return;
	}

	let date = Math.floor(new Date() / 1000);

	const note = {
		id: (notes.length + 1).toString(),
		title: title,
		text: text,
		date_create: date,
		date_update: date
	}

	notes.push(note);

	res.status(201).send(note);
});



// get note by id
app.get('/api/notes/:id', (req, res) => {
	let note = notes.find( item => item.id === req.params.id );

	if ( !note ){
		res.status(404).send(`The note with id "${req.params.id}" was not found`);
		return;
	}

	res.status(200).send(note);
});



// update note
app.put('/api/notes/:id', (req, res) => {
	// find note
	let note = notes.find( item => item.id === req.params.id );

	// if not find note
	if ( !note ){
		res.status(404).send(`The note with id "${req.params.id}" was not found`);
		return;
	}

	let title = req.body.title;
	let text = req.body.text || '';

	// if title empty
	if ( !title ){
		res.status(400).send('The field "title" cannot be empty');
		return;
	}


	let date = Math.floor(new Date() / 1000);

	note.title = title;
	note.text = text;
	note.date_update = date;


	res.status(200).send(note);
});



// remove note
app.delete('/api/notes/:id', (req, res) => {
	let note = notes.find( item => item.id === req.params.id );

	// if not found note
	if ( !note ){
		res.status(404).send(`The note with id "${req.params.id}" was not found`);
		return;
	}

	// remove note
	const idx = notes.indexOf(note);
	notes.splice(idx, 1);

	// response
	res.status(200).send(note);
});





// start server
/*app.listen(config.port, () =>
	{
		console.log(`server start on port ${config.port}`);
		console.log(notes);
	}
);*/

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