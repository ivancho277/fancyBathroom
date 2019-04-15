var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.

  // This will run on page load to generate the feed
  app.get("/", function (req, res) {
    db.Images.findAll()
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          feed: true,
          post: false,
          favorites: false,
          loggedIn: true
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (err, result) {
      console.log("create row", result);
      res.json(result);
    });
  });

  app.post("/api/images", function (req, res) {
    db.Image.create(req.body).then(function (err, result) {
      console.log("create row", result);
      res.json(result);
    });
  });


  app.get("/api/users", function (req, res) {
    db.User.findaAll().then(function (err, result) {
      res.json(result);
    });
  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function (req, res) {

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function (req, res) {

  });
}