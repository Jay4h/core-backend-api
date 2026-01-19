const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const authenticate = require('../middleware/auth.middleware');

// @route   GET /stats
router.get('/', authenticate, statsController.getStats);

// @route   GET /health (public - no auth required)
router.get('/health', statsController.healthCheck);

module.exports = router;
