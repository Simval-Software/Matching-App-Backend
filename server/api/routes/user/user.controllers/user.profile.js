let User = require('./../user.model'),
    userQueries = require('./user.queries');

module.exports = {
    getMyProfile(req, res, next) {
        let { _id } = req.user;

        userQueries.getShortUserById(_id).then((user) => {
            if (user) {
                res.send({user: user._doc});
            } else {
                next(new Error('Unable to find user! Please contact Simo or Valio'));
            }
        });
    },
    editMyProfile(req, res, next) {
        if (req.user && req.user._id) {
            let { firstName, lastName, gender, city, country, dateOfBirth } = req.body;

            userQueries.getShortUserById(req.user._id).then((user) => {
                user = user._doc;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.gender = gender || user.gender;
                user.city = city || user.city;
                user.country = country || user.country;
                user.dateOfBirth = dateOfBirth || user.dateOfBirth;

                user.save().then((data) => {
                    debugger;
                }).catch((err) => {
                    debugger;
                })
            })
        }
    }
}