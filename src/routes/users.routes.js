const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { updateUserValidation, validate } = require('../middleware/validator.middleware');
const authenticate = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

// @route   GET /users/me
router.get('/me', usersController.getCurrentUser);

// @route   PATCH /users/me
router.patch('/me', updateUserValidation, validate, usersController.updateCurrentUser);

module.exports = router;
