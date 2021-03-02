var path = require("path");
console.log(path);

//Specifies HTML ROUTING for app to work
module.exports = (app) =>{

    app.get('/notes', (request, result) => {
        result.sendFile(path.join(__dirname, "./public/"));

    });
    app.get("*", (request, result) => {
        result.sendFile(path.join(__dirname, "../public/"));
    });
};

