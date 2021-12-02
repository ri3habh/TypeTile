const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// Create the user schema, must have an email, a username, and a password (the last two
//  are added on my passport)
const UserSchema = new Schema(
    {
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        scores: [Number],
        highScore: Number
    }
);

// Plugin for passport
UserSchema.plugin(passportLocalMongoose);

// Compile and export the model
const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;