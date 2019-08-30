var db = require("../models");
var Sequelize = require("sequelize");

// Routes
//============
module.exports = function (app) {

  // ALL USER'S LIKED IMAGES -- THIS DOESN'T WORK
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
  // //////////////////////////////////////////////////

  // GET USERNAME AND USER ID - NOT SURE IF THIS WORKS
  app.get("/signed/:user", function (req, res) {
    db.User.findOne({
      where: { userName: req.params.user }
    }).then(function (result) {
      res.json(result);
    });
  });
  ////////////////////////////////////////////////////

  // ADDING NEW USERS - THIS WORKS!
  app.post("/api/users", function (req, res) {
    // check if they're already user, if exists get the user, if not add new row
    db.User.findOrCreate({
      where:
        { userName: req.body.userName },
    }).then(function (result) {
      res.json(result);
    });
  });
  ///////////////////////////////////////////////////


  // THIS IS MISSING ADDING THE USER ID TO THE POST
  // insert into images when they submit a new post
  app.post("/api/images", function (req, res) {
    // const newImg = {...req.body, userId: whatever}
    db.User.findOne({
      where: {
        userName: req.body.username
      }
    }).then(function (result) {
      res.json(result)
    })
    // db.Image.create(req.body).then(function (result) {
    //   // Image.addUser(req.params.id);
    //   res.json(result);
    // });
  });
  ////////////////////////////////////////////////////////

  // GENERATE FEED ON PAGE LOAD - THIS WORKS
  app.get("/", function (req, res) {
    db.Image.findAll().then(function (data) {
      res.render("index", { images: data });
    });
  });
  ///////////////////////////////////////////////////////////



  // NOT LOGGED IN - SORT BY IMAGES WITH MOST FAVS - HALFWAY WORKS
  app.get("/feed/orderbymostfavorited", function (req, res) {
    console.log("1. hello from liked users");
    db.User.findAndCountAll({
      include: { model: db.Image, as: "likedImages" },
      attributes: [
        [Sequelize.literal("(SELECT COUNT(image_id) FROM Likes)"), "ImageCount"]],
      order: [[Sequelize.literal("ImageCount"), "DESC"]]
    })
      .then(data => {
        console.log("2. getlikeduserdata" + data);
        res.json(data);
      })

  }); //app.get ending tag
  ///////////////////////////////////////////////


  // DISPLAY ALL USERS UPLOADED IMAGES - THIS DOES NOT WORK
  app.get("/signed/:name/posts", function (req, res) {
    db.User.findOne({
      where: { userName: req.params.name },
      include: [{ model: db.Image }]
    }).then(user => {
      res.render("index", { images: user.Images, loggedIn: true });
      // res.json(user);
    });
  });
  //////////////////////////////////////////////


  // LIKING AN ADD IMAGE AND ADDING RELATIONSHIP TO LIKES TABLE - THIS DOES NOT WORK
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
  //////////////////////////////////////

  // SEARCH AND DISPLAY BY TAGS - THIS WORKS
  app.get("/search/:term", function (req, res) {
    db.Image.findAll({
      where: { tag: req.params.term },
      // { userName: req.params.term }
    }).then(function (result) {
      // render page with only posts with specifed tags or by specified user
      res.render("index", { images: result });
      // res.render("index", result);
    });
  });
  ///////////////////////////  

} // end of export module bracket
