const Queue = require('bull');
const fetch = require('node-fetch');
const logService = require('./logService');

const dataQueue = new Queue('dataQueue', process.env.REDIS_URL);

dataQueue.process(async (job, done) => {
    const { destination, eventData, meta } = job.data;
    const { event_id, account_id } = meta;

    try {
        const response = await fetch(destination.url, {
            method: destination.http_method,
            headers: destination.headers,
            body: JSON.stringify(eventData)
        });

        const status = response.ok ? 'success' : 'failed';

        await logService.recordLog({
            event_id,
            account_id,
            destination_id: destination._id,
            received_data: eventData,
            status
        });

        done(null, { success: true });
    } catch (error) {
        await logService.recordLog({
            event_id,
            account_id,
            destination_id: destination._id,
            received_data: eventData,
            status: 'failed'
        });

        done(new Error("Failed to send data"));
    }
});

module.exports = dataQueue;
