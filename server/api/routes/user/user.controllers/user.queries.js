let User = require('../user.model');

module.exports = {
    addUser(data) {
        let {email, password} = data;
        let user = new User({ email, password });

        return user.save().then((user) => { return user; });
    }
    // getAllUsers(req, res) {
    //     let pesho = new User({
    //         "email": 'ivan@kostov.bg'
    //     });
    //     User.find().exec()
    //         .then((users) => { res.json(users[users.length - 1]); })
    //         .catch((error) => { console.error(error); });
    // }
    // getUserByEmail(email) {
    //     if (email) {
    //         return User.findOne({email}).exec().then((doc) => {
    //             debugger;
    //             return doc._doc;
    //         });
    //     }
    // }
};