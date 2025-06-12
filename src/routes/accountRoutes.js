const express = require('express');
const { createAccount, getAccounts, updateAccount, deleteAccount } = require('../controllers/accountController.js');
const authenticateUser = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authenticateUser, createAccount);
router.get('/', authenticateUser, getAccounts);
router.put('/:id', authenticateUser, updateAccount);
router.delete('/:id', authenticateUser, deleteAccount);

module.exports = router;
