const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const auth = require('../middlewares/auth.middleware'); // Asegúrate de importar esto

// Añade `auth` como middleware
router.post('/', auth, notesController.createNote);
router.get('/', auth, notesController.getNotes);
router.put('/:id', auth, notesController.updateNote);
router.delete('/:id', auth, notesController.deleteNote);
router.post('/share', auth, notesController.shareNote);
router.get('/stats', auth, notesController.getNoteStats);

module.exports = router;