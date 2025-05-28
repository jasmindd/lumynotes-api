const Note = require('../models/Note');

exports.getNoteStats = async (req, res) => {
  try {
    const userId = req.userId;

    const totalNotes = await Note.countDocuments({ userId });

    res.json({
      totalNotes
      // podés agregar más datos si querés
    });
  } catch (err) {
    
    res.status(500).json({ error: 'Error obteniendo estadísticas' });
  }
};
