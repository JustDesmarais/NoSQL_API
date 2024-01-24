const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: Schema.Types.ObjectId,
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
);

module.exports = reactionSchema;
