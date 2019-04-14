var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // Create all our routes and set up logic within those routes where required.

// This will run on page load to generate the feed
app.get("/", function(req, res) {
  // data is the entire images table
  // db.Images.findAll()
  //   .then(function(data) {
  //     // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
  //     var hbsObject = {
  //       images: ["hi", "hi", "hi", "hi", "hi"],
  //       feed: true,
  //       post: false,
  //       favorites: false,
  //       loggedIn: true
  //     };
  //     // since feed is true page renders feed.
  //     res.render("index", hbsObject);
  //   });
    var hbsObject = {
      images: ["hi", "hi", "hi", "hi", "hi"],
      feed: true,
      post: false,
      favorites: false,
      loggedIn: true
    };
    res.render("index", hbsObject)
});
  // // GET route for getting all of the todos
  // app.get("/api/todos", function(req, res) {
  //     db.Images.findAll()
  //       .then(function(data){
  //         res.json(data);
  //       });
  // });

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {

  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function(req, res) {

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function(req, res) {

  });
};