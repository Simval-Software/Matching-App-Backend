let userQueries = require('./user.queries'),
    profileCtrl = require('./user.profile'),
    matchesCtrl = require('./user.matches');

module.exports = {
    queries: userQueries,
    profileCtrl,
    matchesCtrl
};