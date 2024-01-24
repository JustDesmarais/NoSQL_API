const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// function to format created date
function createdDate (val) {
    if (!val) return val;
    return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
  }

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
            default: Date.now
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

// getter method to format the timestamp on query
thoughtSchema.path('createdAt').get(createdDate);
reactionSchema.path('createdAt').get(createdDate);

// Create virtual property that counts the number of reactions on each thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
