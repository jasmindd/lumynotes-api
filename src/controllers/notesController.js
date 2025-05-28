const Note = require('../models/Note');

// Crear nota
exports.createNote = async (req, res) => {
  try {
    const newNote = new Note({
      ...req.body,
      userId: req.userId  // tomado del middleware de autenticación
    });

    const saved = await newNote.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener notas de un usuario
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar nota
exports.updateNote = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.userId;  // <-- elimina userId para que no se actualice

    
    const updated = await Note.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};


// Eliminar nota
exports.deleteNote = async(req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Nota eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Compartir nota
exports.shareNote = async(req, res) => {
    const { noteId, sharedUserId } = req.body;
    try {
        const note = await Note.findById(noteId);
        note.sharedWith.push(sharedUserId);
        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Estadísticas de notas por usuario
exports.getNoteStats = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId es requerido en query params' });
    }

    const totalNotes = await Note.countDocuments({ userId });
    const sharedNotes = await Note.countDocuments({ userId, sharedWith: { $exists: true, $not: { $size: 0 } } });

    res.json({
      totalNotes,
      sharedNotes,
      personalNotes: totalNotes - sharedNotes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};