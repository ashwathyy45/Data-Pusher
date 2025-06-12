const express = require('express');
const router = express()
const { registerUser, loginUser } = require('../controllers/userController.js');
const { validateRegistration } = require('../middlewares/validators');

router.post('/register', validateRegistration, registerUser);
router.post('/login', loginUser);

module.exports = router;
