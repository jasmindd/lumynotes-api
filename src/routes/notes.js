const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.post('/', notesController.createNote);
router.get('/', notesController.getNotes);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);
router.post('/share', notesController.shareNote);
router.get('/stats', notesController.getNoteStats);


module.exports = router;