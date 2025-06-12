const mongoose = require('mongoose');

const AccountMemberSchema = new mongoose.Schema({
    account_id: {
        type: Number,
        ref: 'Account',
        required: true
    },
    user_id: {
        type: Number,
        ref: 'User',
        required: true
    },
    role_id: {
        type: Number,
        ref: 'Role',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('AccountMember', AccountMemberSchema);
