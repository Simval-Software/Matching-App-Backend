let userQueries = require('./user.queries'),
    profileCtrl = require('./user.profile'),
    matchesCtrl = require('./user.matches');
    interactionCtrl = require('./user.interaction');

module.exports = {
    queries: userQueries,
    profileCtrl,
    matchesCtrl,
    interactionCtrl
};