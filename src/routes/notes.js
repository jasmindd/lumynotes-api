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