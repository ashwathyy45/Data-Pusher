const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    event_id: { type: String, unique: true, required: true },
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    received_timestamp: { type: Date, required: true },
    processed_timestamp: { type: Date },
    received_data: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, enum: ['success', 'failed'], default: 'success' }
});

module.exports = mongoose.model('Log', LogSchema);
