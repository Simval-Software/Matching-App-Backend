'use strict';
var users = [];

module.exports = {
    login(req, res) {
        res.json({ id: 1, name: 'valeri' });
    },
    register(req, res) {
        return 'chekor';
    }
}