const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const auth = require('../middlewares/auth.middleware');

// Ruta protegida que devuelve estadísticas de notas
router.get('/', auth, statisticsController.getNoteStats);

module.exports = router;
