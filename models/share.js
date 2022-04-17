const { Schema, model } = require('mongoose');

const newDate = new Schema({
    guildID: {
        type: String,
    },
    guildName: {
        type: String
    },
    channel: {
        type: String,
        default: 'Not Selected'
    },
    desc: {
        type: String,
        default: 'Not Selected'
    },
    cooldown: {
        type: Number,
        default: 0
    },
    logs: {
        type: String
    },
});

module.exports = model("ShareBot", newDate);

