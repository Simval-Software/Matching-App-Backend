'use strict';

let mongoose = require('mongoose'),
    when = require('when'),
    Crypto = require('crypto'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required!'],
        index: { unique: true },
        set: toLower,
        validate: {
            validator: (val) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    salt: {
        type: String,
        default: generateSalt
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        required: [true, 'Gender is required!'],
        validate: {
            validator: (val) => {
                return val === 'M' || val === 'F';
            },
            message: '{VALUE} is not a valid gender!'
        }
    },
    dateOfBirth: {
        type: Number,
        required: [true, 'Date of birth is required!']
    },
    zodiac: Number,
    country: {
        type: String,
        required: [true, 'Country is a required field!']
    },
    city: {
        type: String,
        required: [true, 'City is a required field!']
    },
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
    lastLoggedIn: Number,
    profileCreatedOn: Number,
    profileEditedOn: Number
});

UserSchema.pre('save', function (next) {
    let user = this._doc;
    let {salt, password} = user;

    pbkdfEncryptPassword(password, salt).then((hash) => {
        user.password = hash;
        next();
    });

    user.profileCreatedOn = Date.now();
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