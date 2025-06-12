const express = require('express');
const router = express.Router();
const accountMemberController = require('../controllers/accountMemberController.js');
const authenticateUser = require('../middlewares/authMiddleware');

router.post('/', authenticateUser, accountMemberController.addAccountMember);
router.get('/account/:accountId', authenticateUser, accountMemberController.getMembersByAccount);
router.get('/:id', authenticateUser, accountMemberController.getMemberById);
router.put('/:id', authenticateUser, accountMemberController.updateMemberRole);
router.delete('/:id', authenticateUser, accountMemberController.removeMember);

module.exports = router;
