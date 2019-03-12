const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteShema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	text: {
		type: String,
		trim: true
	},
	date_create: {
		type: Number,
		required: true
	},
	date_update: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('note', NoteSchema);