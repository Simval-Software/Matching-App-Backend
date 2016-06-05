let User = require('../user.model');

module.exports = {
    getAllUsers(req, res) {
        let pesho = new User({
            "email": 'ivan@kostov.bg'
        });
        User.find().exec()
            .then((users) => { res.json(users[users.length - 1]) })
            .catch((error) => { console.error(error); });
    }
};