'use strict';

let mongoose = require('mongoose'),
Crypto = require('crypto'),
Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
        set: toLower
    },
    firstName: String,
    lastName: String,
    salt: {
        type: String,
        default: generateSalt
    },
    passwordHash: {
        type: String
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
    lastLoggedIn: Number
});

let User = mongoose.model('User', UserSchema);

module.exports = User;

function toLower(text) {
    return text.toLowerCase();
}

function generateSalt() {
    return Crypto.randomBytes(256).toString("hex");
}

UserSchema.pre('save', function (next) {
    let user = this._doc;
    let {salt, password} = user;

    const key = Crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');
    let hash = key.toString('hex');

    user.password = hash;
    next();
});

UserSchema.methods.verifyPassword = function (password, hash) {
  // extract the salt and hash from the combined buffer
  var saltBytes = hash.readUInt32BE(0);
  var hashBytes = hash.length - saltBytes - 8;
  var iterations = hash.readUInt32BE(4);
  var salt = hash.slice(8, saltBytes + 8);
  var hash = hash.toString('binary', saltBytes + 8);

  // verify the salt and hash against the password
  let verify = Crypto.pbkdf2Sync(password, salt, iterations, hashBytes);

  return verify.toString('binary') === hash;
}