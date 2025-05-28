const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:id', auth, userController.updateProfile); 
router.get('/profile', auth, userController.getProfile);
module.exports = router;
