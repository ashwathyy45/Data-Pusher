const express = require('express');
const { createDestination, getDestinationsByAccount, updateDestination, deleteDestination } = require('../controllers/destinationController.js');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createDestination);
router.get('/account/:accountId', authenticateUser, getDestinationsByAccount);
router.put('/:id', authenticateUser, updateDestination);
router.delete('/:id', authenticateUser, deleteDestination);

module.exports = router;
