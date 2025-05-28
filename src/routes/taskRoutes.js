const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.put('/:id/complete', authMiddleware, taskController.completeTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);;

module.exports = router;
