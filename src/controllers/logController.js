const Log = require('../models/logModel');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving logs" });
    }
};

exports.getLogsByAccount = async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const cacheKey = `logs_account_${accountId}`;
        const logs = await getOrSetCache(cacheKey, async () => {
            return await Log.find({ account_id: accountId }).sort({ received_timestamp: -1 }).limit(50);
        });

        res.status(200).json({ success: true, data: logs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch logs' });
    }
};

exports.getLogByEventId = async (req, res) => {
    try {
        const log = await Log.findOne({ event_id: req.params.eventId });
        res.status(200).json({ success: true, data: log });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving log" });
    }
};
