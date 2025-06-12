const express = require('express');
const { processIncomingData } = require('../controllers/dataHandlerController.js');

const router = express.Router();

router.post('/incoming_data', processIncomingData);

module.exports = router;
