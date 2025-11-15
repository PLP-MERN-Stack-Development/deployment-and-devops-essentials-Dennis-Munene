const express = require('express');
const router = express.Router();
const { createMetric, getUserMetrics, deleteMetric } = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createMetric);
router.get('/', protect, getUserMetrics);
router.delete('/:id', protect, deleteMetric);

module.exports = router;
