let User = require('./../user.model');

module.exports = {
    getMyProfile(req, res, next) {
        let { _id } = req.user;

        User.findById(_id, 'firstName lastName profileImage gender zodiac country city _id').exec().then((user) => {
            if (user) {
                res.send({user: user._doc});
            } else {
                next(new Error('Unable to find user! Please contact Simo or Valio'));
            }
        });
    },
    editMyProfile(req, res, next) {
        
    }
}