const notes = require('../models/NotesEmulated');





// get all notes
module.exports.getAllNotes = async function(req, res){
	res.status(200).send(notes);
}



// add note
module.exports.addNote = async function(req, res){
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
}



// get note by id
module.exports.getNoteById = async function(req, res){
	let note = notes.find( item => item.id === req.params.id );

	if ( !note ){
		res.status(404).send(`The note with id "${req.params.id}" was not found`);
		return;
	}

	res.status(200).send(note);
}



// update note
module.exports.updateNoteById = async function(req, res){
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
}



// delete note
module.exports.deleteNoteById = async function(req, res){
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
}