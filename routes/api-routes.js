var db = require("../models");

// Routes
//============
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.


  // CREATE/INSERT DATA TO DATABASE
  // ==============================
  // POST route for logging a new user into Users table
  app.post("/api/users", function (req, res) {
    // check if they're already user, if exists get the user, if not add new row
   db.User.findOrCreate({
     where: 
       { userName: req.body.userName },
   }).then(function (err, result) {
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

  // READING DATABASE AND RENDERING PAGE
  // ===================================
  // This will run on page load to generate the feed
  app.get("/", function (req, res) {
    db.Image.findAll({
      // order: sequelize.literal('max(id) DESC')
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          loggedIn: true
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  app.get("/feed/orderbymostfavorited/", function (req, res) {
    db.Image.findAll({
      // order: sequelize.literal('max(id) DESC')
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          loggedIn: true
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // display all user's posted images
  app.get("/:username/posts", function (req, res) {
    db.Image.findAll({
      where: {
        user_id: req.params.username
      }
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          loggedIn: true
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // display all user's favorited images
  app.get("/:username/favorited", function (req, res) {
    db.Image.findAll({
      // using association of two tables to grab all images where userId = user_id, includes all images in the likes association table
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          loggedIn: true
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // search & display by tag/username
  app.get("/search/:term", function(req,res){
    db.Image.findAll({ 
      where: 
      { tag: req.params.term }
    }).then(function (err, result) {
      // render page with only posts with specifed tags or by specified user
      var hbsObject = {
        images: result,
        loggedIn: true
      };
      res.render("index", hbsObject);
    });
  });

  app.get("/api/users", function (req, res) {
    db.User.findaAll().then(function (err, result) {
      res.json(result);
    });
  });
  
  // UPDATE DATA FROM DATABASE
  // =========================
  // PUT route for updating post's tags and descriptions
  app.put("/:id", function (req, res) {
    db.Image.put().then(function (err, result){

    });
  });

  // DELETE DATA FROM DATABASE
  // =========================
  // DELETE route for removing previous posts
  app.delete("/:id", function (req, res) {
    db.Image.destroy().then(function(err, result){

    });
  });

}