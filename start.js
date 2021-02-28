//This is the dependencies
const express = require("express");
//const path = require("path");
//const fs = require("fs");
const port = process.env.port|| 8080;
console.log(PORT);

//Making sure the db.json file is doing what it should
const dbJson = require('./db/db.json')

//This is the express app setup
var app = express();


//Accesses the public files so it looks all pretty like

app.use(express.static(__dirname +'./public'));
app.use(express.static('./'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//api and html routing files for communication purposes
require("./apiRouting")(app);
require("./htmlRouting")(app);

//Start the port listening
app.listen(port, LOCAL_ADDRESS ='127.0.0.0', function (){
    console.log("App listening on port"+ port);
});