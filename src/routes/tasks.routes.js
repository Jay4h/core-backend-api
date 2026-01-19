const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const { createTaskValidation, updateTaskValidation, validate } = require('../middleware/validator.middleware');
const authenticate = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

// @route   POST /tasks
router.post('/', createTaskValidation, validate, tasksController.createTask);

// @route   GET /tasks
router.get('/', tasksController.getTasks);

// @route   GET /tasks/:id
router.get('/:id', tasksController.getTaskById);

// @route   PATCH /tasks/:id
router.patch('/:id', updateTaskValidation, validate, tasksController.updateTask);

// @route   DELETE /tasks/:id
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
