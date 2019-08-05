// SERVER TAKE TWO 
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");
const Seeds = require("./seeds");

const app = express();
const PORT = process.env.PORT || 8008;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

const syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions)
  .then(function () {
    console.log("seeding...", Seeds)
    Seeds();
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App now listening at localhost:" + PORT)

    })
  });

module.exports = app;

// // Requiring necessary npm packages

// var express = require("express");

// // Setting up port and requiring models for syncing
// var PORT = process.env.PORT || 3000;
// var db = require("./models");

// // Creating express app and configuring middleware needed for authentication
// var app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));
// // We need to use sessions to keep track of our user's login status
// //app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


// // Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Requiring our routes
// require("./routes/api-routes.js")(app);

// // Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function () {
//   app.listen(PORT, function () {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser." + PORT);
//   });
// });
