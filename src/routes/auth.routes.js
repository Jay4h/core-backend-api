const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validator.middleware');
const authenticate = require('../middleware/auth.middleware');

// @route   POST /auth/register
router.post('/register', registerValidation, validate, authController.register);

// @route   POST /auth/login
router.post('/login', loginValidation, validate, authController.login);

// @route   POST /auth/logout
router.post('/logout', authenticate, authController.logout);

module.exports = router;
