const Destination = require('../models/DestinationModel.js');

exports.createDestination = async (req, res) => {
    try {
        const { account_id, url, http_method, headers } = req.body;
        const newDestination = await Destination.create({ account_id, url, http_method, headers });
        res.status(201).json({ success: true, data: newDestination });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating destination" });
    }
};

// Get all destinations for an account
exports.getDestinationsByAccount = async (req, res) => {
    try {
        const destinations = await Destination.find({ account_id: req.params.accountId });
        res.status(200).json({ success: true, data: destinations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving destinations" });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedDestination });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating destination" });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        await Destination.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting destination" });
    }
};
