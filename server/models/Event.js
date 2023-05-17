const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    title: {
        type: String
    },
    eventBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) =>dateFormat(timestamp),
    },
});

const Event = model('Event', eventSchema);

module.exports = Event;