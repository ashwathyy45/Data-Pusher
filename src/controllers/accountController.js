const Account = require('../models/AccountModel.js');
const { getOrSetCache } = require('../utils/cache.js');

exports.getAccounts = async (req, res) => {
    const userId = req.user.id;
    try {
        const cacheKey = `accounts_user_${userId}`;
        const accounts = await getOrSetCache(cacheKey, async () => {
            return await Account.find({ created_by: userId });
        });

        res.status(200).json({ success: true, data: accounts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch accounts' });
    }
};

exports.createAccount = async (req, res) => {
    try {
        const { account_name, website } = req.body;
        const created_by = req.user.id;
        const newAccount = await Account.create({ account_name, website, created_by });
        res.status(201).json({ success: true, data: newAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating account" });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating account" });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting account" });
    }
};
