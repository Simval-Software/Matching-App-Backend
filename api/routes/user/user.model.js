'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
        set: toLower
    },
    firstName: String,
    lastName: String,
    passwordHash: {
        type: String,
        set: encodePassword
    },
    gender: String,
    dateOfBirth: Number,
    zodiac: Number,
    country: String,
    city: String,
    matches: [ObjectId],
    questionaries: [{
        question: String,
        answers: [String]
    }],
    messages: [{
        sender: ObjectId,
        reciever: ObjectId,
        message: String
    }],
    images: [{
        generatedName: String,
        originalName: String
    }],
    profileImage: {
        generatedName: String,
        originalName: String
    },
    salt: {
        type: String,
        set: generateSalt
    },
    lastLoggedIn: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;

function generateSalt() {
    //return Math.round((new Date().valueOf() * Math.random())) + '';

    // Crypto.randomBytes('256', function(err, buf) {
    //     if (err) throw err;
    //     return buf;
    // });

    // return Crypto.randomBytes('256'); // fails to
}

function encodePassword() {

}