let User = require('./../user.model'),
    userQueries = require('./user.queries'),
    when = require('when');

module.exports = {
    likeUser: (req, res, next) => {
        if (req.user && req.user._id && req.body && req.body.userId) {
            let { userId } = req.body;
            let { _id } = req.user;

            when.all([User.findById(userId).exec(), User.findById(_id).exec()])
                .then((data) => {
                    let [likedUser, me] = data;

                    if (likedUser && me) {
                        return when.all([addIdInCollection(userId, _id, 'likedUsers'), addIdInCollection(_id, userId, 'likedByUsers')]);
                    } else {
                        throw new Error('Invalid user ID');
                    }
                })
                .then((data) => {
                    let [likedUser, me] = data;

                    if (likedUser && me) {
                        likedUser = likedUser.toObject();
                        me = me.toObject();

                        let doesSheLikesMe = likedUser.likedUsers.some((id) => { return id.equals(_id); });
                        let doILikeHer = me.likedUsers.some((id) => { return id.equals(userId); });

                        if (doesSheLikesMe && doILikeHer) {
                            return when.all([addIdInCollection(userId, _id, 'matches'), addIdInCollection(_id, userId, 'matches')])
                                .then((data) => {
                                    let [likedUser, me] = data;

                                    res.json({
                                        match: true,
                                        user: {
                                            _id: likedUser._id,
                                            firstName: likedUser.firstName,
                                            lastName: likedUser.lastName,
                                            profileImage: likedUser.profileImage
                                        }
                                    });
                                });
                        } else {
                            res.json({ match: false });
                        }
                    }
                })
                .catch((err) => {
                    next(new Error(err));
                });
        }

        function addIdInCollection(myId, herId, collectionName) {
            let pusherObj = {};
            pusherObj[collectionName] = herId;

            return User.findOneAndUpdate({ _id: myId }, { $addToSet: pusherObj }, { safe: true, new: true, upsert: true }).exec();
        }
    },
    getMyMatches(req, res, next) {
        if (req.user && req.user._id) {
            User.findById(req.user._id, 'matches').exec().then((data) => {
                let promises = [],
                    { matches } = data;

                for (let i = 0; i < matches.length; i++) {
                    promises.push(userQueries.getShortUserById(matches[i]));
                }

                return when.all(promises);
            })
            .then((data) => {
                res.json({
                    matches: data
                });
            })
            .catch((err) => {next(new Error(err))});
        }
    }
}