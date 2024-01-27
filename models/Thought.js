const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const createdDate = require('../utils/helpers');




const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            minLength: 1, 
            maxLength: 280, 
        }, 
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdDate
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

// getter method to format the timestamp on query


// Create virtual property that counts the number of reactions on each thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
