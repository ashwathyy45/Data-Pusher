const Log = require('../models/logModel.js');

exports.recordLog = async ({ event_id, account_id, destination_id, received_data, status }) => {
    try {
        await Log.create({
            event_id,
            account_id,
            destination_id,
            received_data,
            received_timestamp: new Date(),
            processed_timestamp: new Date(),
            status
        });
    } catch (error) {
        console.error("Failed to log event:", error.message);
    }
};
