const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/notesAPI');



// get all notes
router.get('/notes', controller.getAllNotes);

// add note
router.post('/notes', controller.addNote);

// get note by id
router.get('/notes/:id', controller.getNoteById);

// update note
router.put('/notes/:id', controller.updateNoteById);

// remove note
router.delete('/notes/:id', controller.deleteNoteById);

module.exports = router;