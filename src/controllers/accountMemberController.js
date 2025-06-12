const AccountMember = require('../models/accountMemberModel');

exports.addAccountMember = async (req, res) => {
    try {
        const member = await AccountMember.create(req.body);
        res.status(201).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding member" });
    }
};

exports.getMembersByAccount = async (req, res) => {
    try {
        const members = await AccountMember.find({ account_id: req.params.accountId })
            .populate('user_id', 'email')
            .populate('role_id', 'role_name');
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving members" });
    }
};

exports.getMemberById = async (req, res) => {
    try {
        const member = await AccountMember.findById(req.params.id);
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving member" });
    }
};

exports.updateMemberRole = async (req, res) => {
    try {
        const updated = await AccountMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating role" });
    }
};

exports.removeMember = async (req, res) => {
    try {
        await AccountMember.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Member removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing member" });
    }
};
