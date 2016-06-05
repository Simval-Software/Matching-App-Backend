let User = require('../user.model');

module.exports = {
    addUser(data) {
        let {email, password} = data;
        let user = new User({
            email,
            password
        });

        return User.save()
            .then((user) => { return user })
            .catch((error) => {console.error(error)});
    },
    getAllUsers(req, res) {
        let pesho = new User({
            "email": 'ivan@kostov.bg'
        });
        User.find().exec()
            .then((users) => { res.json(users[users.length - 1]) })
            .catch((error) => { console.error(error); });
    }
};