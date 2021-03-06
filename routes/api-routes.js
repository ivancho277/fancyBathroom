var db = require("../models");

// Routes
//============
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.

  // CREATE/INSERT DATA TO DATABASE
  // ==============================
  // POST route for logging a new user into Users table
  // server side check


  // ALL USER'S LIKED IMAGES
  app.get('/signed/:name/favorites', (req, res) => {
    db.User.findOne({
      where: { userName: req.params.name },
      include: { model: db.Image }
    }).then(joe => {
      joe.getLikedImages().then(assocLikes => {
        res.render("index", { images: assocLikes });
      });
    });
  });

  // query call to get username and user.id
  app.get("/signed/:user", function (req, res) {
    db.User.findOne({
      where: {userName: req.params.user}
    }).then(function (result) {
      res.json(result);
    });
  });

  // Adding new Users
  app.post("/api/users", function (req, res) {
    // check if they're already user, if exists get the user, if not add new row
    db.User.findOrCreate({
      where:
        { userName: req.body.userName },
    }).then(function (result) {
      res.json(result);
    });
  });

  // insert into images when they submit a new post
  app.post("/api/images", function (req, res) {
    db.Image.create(req.body).then(function (result) {
     // Image.addUser(req.params.id);
      res.json(result);
    });
  });

  // This will run on page load to generate the feed
  app.get("/", function (req, res) {
    db.Image.findAll().then(function (data) {
        res.render("index", { images: data });
    });
  });


  // JOE's HELP CODE
  // grab data from image data ordered by most favorited
  app.get("/feed/orderbymostfavorited", function (req, res) {
    db.Image.findAll({
      include: { model: db.User },
    }).then(data => {
      console.log(data);
      data.getLikedUser().then(mostFav => {
        res.json(mostFav);
      });
    });
  });

  // display all user's posted images
  app.get("/signed/:name/posts", function (req, res) {
    db.User.findOne({
      where: { userName: req.params.name },
      include: [{ model: db.Image }]
    }).then(user => {
      res.render("index", { images: user.Images, loggedIn: true });
      // res.json(user);
    });
  });

  // JOE's HELP CODE
  // LIKING AN ADD IMAGE AND ADDING RELATIONSHIP TO LIKES TABLE
  app.post("/api/likes", function (req, res) {
    // req.body should be in form { user_id: something, image_id: something }
    db.User.findOne({
      where: {
        id: req.body.user_id
      }
    }).then(user => {
      user.addLikedImage(req.body.image_id);
      res.json(user);
    });
  });

  // search & display by tag/username
  app.get("/search/:term", function (req, res) {
    db.Image.findAll({
      where: { tag: req.params.term}, 
          // { userName: req.params.term }
    }).then(function (result) {
      // render page with only posts with specifed tags or by specified user
      res.render("index", {images: result});
      // res.render("index", result);
    });
  });



  // // find all user
  // app.get("/api/users", function (req, res) {
  //   db.User.findAll().then(function (result) {
  //     res.json(result);
  //   });
  // });

  // UPDATE DATA FROM DATABASE
  // =========================
  // PUT route for updating post's tags and descriptions
  // app.put("/:id", function (req, res) {
  //   db.Image.put().then(function (err, result){

  //   });
  // });

  // DELETE DATA FROM DATABASE
  // =========================
  // DELETE route for removing previous posts
  // app.delete("/:id", function (req, res) {
  //   db.Image.destroy().then(function(err, result){

  //   });
  // });

} // end of export module bracket
