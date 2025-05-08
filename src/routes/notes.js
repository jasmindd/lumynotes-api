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