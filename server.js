var express = require("express");
var bodyParser = require("body-parser");
var path = require('path')

// Sets an initial port. We"ll use this later in our listener
var app = express();
var PORT = process.env.PORT || 3200;
require("./app/routing/ApiRoutes")(app)
require("./app/routing/HtmlRoutes")(app)
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log(`Server is listening on PORT ${PORT}`)
})