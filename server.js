'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(express.static('client'));  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port 3000')
});