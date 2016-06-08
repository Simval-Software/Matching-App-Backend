'use strict';

module.exports = {
    init: start()
}

function start() {
    let app = require('express')(),
        routes = require('./api/routes/'),
        config = require('./config/config'),
        port = config.port

    require('./db/connection')(config.db.url);
    require('./middleware/app.middleware')(app);
    app.use('/api/', routes);

    app.use((err, req, res, next) => {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        }
    })

    return function () {
        app.listen(port, function () {
            console.log(`Server listening on port ${port}`);
        });
    }
}