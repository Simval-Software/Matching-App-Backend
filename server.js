'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    userRoutes = require('./api/routes/user/user.route');

// app.use(express.static('client'));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});