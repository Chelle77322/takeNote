const { request } = require("http");
var path = require("path");
//Specifies HTML ROUTING for app to work
module.exports = (app) =>{

    app.get("/notes", function (request, result){
        result.sendFile(path.join(__dirname, "./public/notes.html"));

    });
    app.get("/index", (request, result) => {
        result.sendFile(path.join(__dirname, "./index.html"));
    });
};
