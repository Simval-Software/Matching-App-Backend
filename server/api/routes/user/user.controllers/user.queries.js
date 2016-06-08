let User = require('../user.model')
    when = require('when');

module.exports = {
    addUser(data) {
        let {email, password, confirmPass, firstName, lastName, gender, city, country, dateOfBirth} = data;
        let user = new User({ email, password, confirmPass, firstName, lastName, gender, city, country, dateOfBirth });

        return user.save().then((user) => { return user; });
    },
    getUserByEmail(email) {
        if (email) {
            return User.findOne({email}).exec().then((user) => { return user; });
        }
    },
    verifyUser(email, password) {
        let deffered = when.defer();

        if (email && password) {

			this.getUserByEmail(email).then((user) => {
			    if (user) {
                    user.verifyPassword(password, user.salt, user.password).then((areEqual) => {
                        if (areEqual) {
                            deffered.resolve(user);
                        } else {
                            deffered.resolve(null);
                        }
                    });
                } else {
                    deffered.resolve(null);
                }
			});
        }

        return deffered.promise;
    }
};