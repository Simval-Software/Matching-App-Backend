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
    visitors: [ObjectId],
    likedUsers: [ObjectId],
    likedByUsers: [ObjectId],
    matches: [ObjectId],
    questionaries: [{
        id: Number,
        question: String,
        answers: [{
            id: Number,
            content: String
        }],
        preferedAnswer: Number
    }],
    messages: [{
        id: Number,
        sender: ObjectId,
        reciever: ObjectId,
        content: String
    }],
    images: [{
        id: Number,
        generatedName: String,
        originalName: String
    }],
    profileImage: Number,
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