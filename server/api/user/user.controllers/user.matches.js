let User = require('./../user.model'),
    when = require('when');

module.exports = {
    likeUser: (req, res) => {
        if (req.user && req.user._id && req.body && req.body.userId) {
            let { userId } = req.body;
            let { _id } = req.user;

            when.all([User.findById(userId).exec(), User.findById(_id).exec()])
                .then((data) => {
                    let [likedUser, me] = data;
                    
                    if (likedUser && me) {
                        return when.all([insertLikedByUsers(_id, userId), insertLikedUsers(_id, userId)]);

                        function insertLikedByUsers(myId, likedUser) {
                            return User.findOneAndUpdate({_id: likedUser}, {$push: {'likedByUsers': myId}}, {safe: true, new: true, upsert: true}).exec();
                        }

                        function insertLikedUsers(myId, likedUser) {
                            return User.findOneAndUpdate({_id: myId}, {$push: {'likedUsers': likedUser}}, {safe: true, new: true, upsert: true}).exec();
                        }
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
                            res.json({
                                match: true,
                                user: {
                                    _id: likedUser._id,
                                    firstName: likedUser.firstName,
                                    lastName: likedUser.lastName,
                                    profileImage: likedUser.profileImage
                                }
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
    }
}