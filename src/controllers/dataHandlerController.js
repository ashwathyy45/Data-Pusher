const Account = require('../models/AccountModel');
const Destination = require('../models/DestinationModel');
const dataQueue = require('../services/dataQueue');

exports.processIncomingData = async (req, res) => {
    try {
        const { CL_X_TOKEN, CL_X_EVENT_ID } = req.headers;
        const eventData = req.body;

        if (!CL_X_TOKEN || !CL_X_EVENT_ID) {
            return res.status(400).json({ success: false, message: "Missing required headers" });
        }

        const account = await Account.findOne({ app_secret_token: CL_X_TOKEN });
        if (!account) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        const destinations = await Destination.find({ account_id: account._id });
        if (destinations.length === 0) {
            return res.status(404).json({ success: false, message: "No destinations configured" });
        }

        destinations.forEach(dest => {
            dataQueue.add({ destination: dest, eventData });
        });

        res.status(200).json({ success: true, message: "Data queued successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error processing data" });
    }
};
