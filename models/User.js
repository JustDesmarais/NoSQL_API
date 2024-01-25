const { Schema, model } = require('mongoose');

//function validator(val) {
//    return /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val);
//};

//const custom = [validator, 'Email is not valid']

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            trim: true,
            required: true, 
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    // Regular expression for email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                  },
                  message: props => `${props.value} is not a valid email address!`
                }
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'thought',
            },
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'user',
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
