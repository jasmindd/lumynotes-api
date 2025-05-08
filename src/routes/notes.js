const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Crear nota
router.post('/', async(req, res) => {
    try {
        const newNote = new Note(req.body);
        const saved = await newNote.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Obtener notas de un usuario
router.get('/', async(req, res) => {
    try {
        const notes = await Note.find({ userId: req.query.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Editar nota
router.put('/:id', async(req, res) => {
    try {
        const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Eliminar nota
router.delete('/:id', async(req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Nota eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});