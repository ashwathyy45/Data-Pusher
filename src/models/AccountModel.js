const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    account_name: { type: String, required: true },
    app_secret_token: { type: String, default: () => Math.random().toString(36).substring(2) },
    website: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Account', AccountSchema);


