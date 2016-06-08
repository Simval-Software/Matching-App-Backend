'use strict';

let mongoose = require('mongoose'),
    when = require('when'),
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
    password: {
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

UserSchema.pre('save', function (next) {
    let user = this._doc;
    let {salt, password} = user;
    // TODO: Da probvame da go napravim asinhronno za da tap into the power of NODE
    pbkdfEncryptPassword(password, salt).then((hash) => {
        user.password = hash;
        next();
    });
});

UserSchema.methods.verifyPassword = function (password, salt, hash) {
    return when.promise((resolve, reject) => {
        pbkdfEncryptPassword(password, salt).then((key) => {
            resolve(key === hash);
        });
    });
};

function toLower(text) {
    return text.toLowerCase();
}

function generateSalt() {
    return Crypto.randomBytes(256).toString("hex");
}

function pbkdfEncryptPassword(password, salt) {
    let deffered = when.defer();

    Crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
        if (err) deffered.reject(err);

        deffered.resolve(key.toString('hex'));
    });

    return deffered.promise;
}

let User = mongoose.model('User', UserSchema);

module.exports = User;