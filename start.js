//This is the dependencies
const express = require("express");

require('dotenv').config();
const port = process.env.PORT|| 8080;
console.log(port);

//This is the express app setup
var app = express();


//Accesses the public files so it looks all pretty like

app.use(express.static(__dirname +'./public/'));
app.use(express.static('./'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//api and html routing files for communication purposes
require('./routes/apiRouting')(app);
require('./routes/htmlRouting')(app);


//Start the port listening
app.listen(port,() => {
    console.log("App listening on port"+ port);
});