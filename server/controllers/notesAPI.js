// ----- npm libs ----- //
const genId = require('uuid/v1');

// ----- db ----- //
const Notes = require('../models/Note');

// ----- custom modules ----- //
const genUNIXTime = require('../modules/genUNIXTime');
const errorHandler = require('../modules/errorHandler');





// ----- main code ----- //

// get all notes
module.exports.getAllNotes = async function(req, res) {
	try {

		let notes = await Notes.find();

		res.status(200).json({
			success: true,
			message: 'Ok',
			data: notes
		});

	} catch (err) {
		errorHandler(res, err);
	}
}



// add note
module.exports.addNote = async function(req, res) {
	try {

		if ( !req.body.title ) {
			res.status(400).json({
				success: false,
				message: 'The field "title" cannot be empty'
			});
			return;
		}

		let title = req.body.title;
		let text = req.body.text || '';

		let time = genUNIXTime();
		let id = genId();

		let note = await new Notes ({
			id: id,
			title: title,
			text: text,
			date_create: time,
			date_update: time
		}).save();

		// немного добавил от себя:
		// мне кажется, будет полезным
		// отправить обратно на клиент
		// добавленную заметку
		// чтобы добавить её на страницу без доп. запроса
		// всех заметок с сервера
		// и необходимостью лишних действий на клиенте
		// по сохранению заполненных полей
		// перед отправкой
		res.status(201).json({
			success: true,
			message: 'Created',
			data: note
		});
	} catch (err) {
		errorHandler(res, err);
	}
}



// get note by id
module.exports.getNoteById = async function(req, res) {
	try {
		let note = await Notes.findOne( {id: req.params.id} );

		if ( !note ) {
			res.status(404).json({
				success: false,
				message: `The note with id "${req.params.id}" was not found`
			});
			return;
		}
		
		res.status(200).json({
			success: true,
			message: 'Ok',
			data: note
		});

	} catch (err) {
		errorHandler(res, err);
	}
}



// update note
module.exports.updateNoteById = async function(req, res){
	try {

		if ( !req.body.title ) {
			res.status(400).json({
				success: false,
				message: 'The field "title" cannot be empty'
			});
			return;
		}

		let date = genUNIXTime();

		await Notes.findOneAndUpdate(
			{
				id: req.params.id
			},
			{
				$set:
				{
					title: req.body.title,
					text: req.body.text,
					date_update: date
				}
			}
		);

		let note = await Notes.findOne( {id: req.params.id} );

		res.status(200).json({
			success: true,
			message: 'Ok',
			data: note
		});

	} catch (err) {
		errorHandler(res, err);
	}
}



// delete note
module.exports.deleteNoteById = async function(req, res){
	try {

		if ( !req.params.id ) {
			res.status(400).json({
				success: false,
				message: 'params "id" is required'
			});
		}

		// На случай, если клиент захочет отменить удаление,
		// и заного добавить заметку (можно улучшить маршрут добавления
		// заметок, чтобы сохранять первоначальное время создания
		// удалённых заметок),
		// возвращаем в ответе удалённую заметку
		let note = await Notes.findOne( {id: req.params.id} );

		await Notes.remove( {id: req.params.id} );

		res.status(200).json({
			success: true,
			message: `Note with id ${req.params.id} was deleted successfully`,
			data: note
		});
	} catch (err) {
		errorHandler(res, err);
	}
}