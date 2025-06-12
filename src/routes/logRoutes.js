const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController.js');
const authenticateUser = require('../middlewares/authMiddleware');

router.get('/', authenticateUser, logController.getAllLogs);
router.get('/account/:accountId', authenticateUser, logController.getLogsByAccount);
router.get('/:eventId', authenticateUser, logController.getLogByEventId);

module.exports = router;
