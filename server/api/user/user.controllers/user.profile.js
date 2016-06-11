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

            User.update({_id: req.user._id}, {
                firstName, lastName, gender, city, country, dateOfBirth
            }).exec().then((data) => {
                res.send(data);
            }).catch((err) => {
                next(new Error(err));
            });
        }
    }
}