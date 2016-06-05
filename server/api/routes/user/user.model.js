'use strict';

let mongoose = require('mongoose'),
Crypto = require('crypto'),
Schema = mongoose.Schema;

let userSchema = new Schema({
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
    popularity: {
        type: Number,
        default: 0
    },
    visits: {
        type: Number,
        default: 0
    },
    visitors: [Schema.Types.ObjectId],
    likedUsers: [Schema.Types.ObjectId],
    likedByUsers: [Schema.Types.ObjectId],
    matches: [Schema.Types.ObjectId],
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
        sender: Schema.Types.ObjectId,
        reciever: Schema.Types.ObjectId,
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
        default: generateSalt
    },
    lastLoggedIn: Number
});

let User = mongoose.model('User', userSchema);

module.exports = User;

function toLower(text) {
    return text.toLowerCase();
}

function generateSalt() {
    return Crypto.randomBytes(256).toString("hex");
}

function encodePassword(password) {
    password += 'pesho'
    return password;
}