var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.

  // This will run on page load to generate the feed
  app.get("/", function (req, res) {
    db.Image.findAll()
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

  // insert user into table
  // POST route for logging a new user into Users table
  app.post("/api/users", function (req, res) {
     // check if they're already user (not sure how...)
    db.User.create(req.body).then(function (err, result) {
      console.log("create row", result);
      res.json(result);
    });
  });
 
  // insert into images when they submit a new post
  app.post("/api/images",function (req,res){
    db.Image.create(req.body).then(function (err, result) {
      console.log("create new image row", result);
      res.json(result);
    });
  });

  // search & display by tag
  app.get("/:tag", function(req,res){
    db.Image.findAll({ 
      where: 
      { tag: req.params.tag }
    }).then(function (err, result) {
      // render page with only posts with specifed tags
      var hbsObject = {
        images: result,
        feed: true
      };
      res.render("index", hbsObject);
    });
  });

  // search & display by username
  app.get("/:user", function(req,res){
    db.Image.findAll({ 
      where: 
      { user_id: req.params.user }
    }).then(function (err, result) {
      var hbsObject = {
        images: result,
        feed:true
      };
      // render page with only posts by the specified user
      res.render("index", hbsObject);
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

  // // grabbing all posts by logged in user
  // app.get("/api/images", function (req, res) {
  //   db.User.findaAll({
  //     where: 
  //       {user_id: 12345}
  //     }).then(function (err, result) {
  //     res.json(result);
  //   });
  // });

  // DELETE route for removing posts.
  app.delete("/:id", function (req, res) {
    db.Image.destroy().then(function(err, result){

    });
  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/:id", function (req, res) {
    db.Image.put().then(function (err, result){

    });
  });
}