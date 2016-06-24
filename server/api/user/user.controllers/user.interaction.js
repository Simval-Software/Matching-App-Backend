let User = require('./../user.model');

module.exports = {
    getRandomUser(req, res, next) {
        User.findOneRandom((err, user) => {
            if (user) {
                res.send({user: user._doc});
            } else {
                next(new Error('Unable to find user! Please contact Simo or Valio'));
            }
        });
    }
}