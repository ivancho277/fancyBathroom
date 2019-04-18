var db = require("../models");

// Routes
//============
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.

  // CREATE/INSERT DATA TO DATABASE
  // ==============================
  // POST route for logging a new user into Users table
  // server side check


  // JOE's HELP CODE TEST
  app.get('/testers', (req, res) => {
    db.User.findOne({ where: { id: 1 }, include: [db.Image] }).then(joe => {
      joe.getLikedImages().then(assocLikes => {
        res.json({ joe, assocLikes });
      })
    })
  })

  
  app.post("/api/users", function (req, res) {
    // check if they're already user, if exists get the user, if not add new row
    db.User.findOrCreate({
      where:
        { userName: req.body.userName },
    }).then(function (result) {
      console.log("create row", result);
      res.json(result);
    });
  });


  // JOE's HELP CODE
  app.post("/api/likes", function (req, res) {
    // req.body should be in form { user_id: something, image_id: something }
    db.User.findOne({ where: { id: req.body.user_id } }).then(user => {
      user.addLikedImage(req.body.image_id);
      res.json(user);
    })
  });

  // insert into images when they submit a new post
  app.post("/api/images", function (req, res) {
    console.log("new image post", req.body);
    db.Image.create(req.body).then(function (result) {
      // result.addUser(1);
      console.log("create new image row", result);
      res.json(result);
    });
  });

  // READING DATABASE AND RENDERING PAGE
  // ===================================
  // This will run on page load to generate the feed
  app.get("/", function (req, res) {
    db.Image.findAll()
      .then(function (data) {
        res.render("index", data);
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table

        // var hbsObject = {
        //   images: data,
        // };

        // var hbsObject = {
        //   images: [{
        //     id: "12345",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555606210/tinHat.jpg"
        //   },
        //   {
        //     id: "54667",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555604048/hulaHula.jpg"
        //   },
        //   {
        //     id: "99816",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555604040/columbiaTower.png"
        //   },
        //   {
        //     id: "441",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555604029/bizarro2.jpg"
        //   },
        //   {
        //     id: "998",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555604003/2bitSaloon.jpg"
        //   },
        //   {
        //     id: "234",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555606215/seattleGlassBlowing.jpg"
        //   },
        //   {
        //     id: "42",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555606198/hollowEarthRadio.jpg"
        //   },
        //   {
        //     id: "11113",
        //     url: "https://res.cloudinary.com/instapotty/image/upload/v1555606143/lindas.jpg"
        //   }],
        //   post: false,
        //   favorites: false
        // };
        // // since feed is true page renders feed.
        // res.render("index", hbsObject);
      });
  });

  // when logged in make the add new post form available for user
  app.get("/login", function (req, res) {
    db.Image.findAll()
      .then(function (data) {
        // 
        // data is the entire images table
        var hbsObject = {
          images: data,
          login: req.params.login
        };
        // $("#favBtn").show();
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });


  // JOE's HELP CODE
  // grab data from image data ordered by most favorited
  app.get("/feed/orderbymostfavorited", function (req, res) {
    db.User.findAll({
      where: { id: 1 },
      include: [{
        model: db.Image
      }],
      // // joins Image and Likes table
      // // SELECT COUNT(Image.id) as Count and Image.*
      // attributes: ['Image.*', [sequelize.fn('COUNT', sequelize.col('Image.id')), 'Count']],
      // order: ['Count', 'DESC']
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        // var hbsObject = {
        //   images: data,
        //   loggedIn: true
        // };
        // $("#favBtn").show();
        // data.getImages();
        res.json(data)
        // since feed is true page renders feed.
        // res.render("index", hbsObject);
      });
  });

  // display all user's posted images
  app.get("/:username/posts", function (req, res) {
    console.log("getting my posts");
    db.User.findOne({
      where: {
        userName: req.params.username
      }
    })
      // userData = {user_id, userName}
      .then(function (userData) {
        // console.log("sailorMoon user", userData);
        db.User.findAll({
          where: {
            user_id: userData.id
          }
        }).then(function (imgData) {
          // console.log("all images posted by sailorMoon", imgData);
          var hbsObject = {
            images: imgData,
            loggedIn: req.params.login,
            myPosts: true
          };
          // since feed is true page renders feed.
          res.render("index", hbsObject);
        });
      });
    });

    // display all user's favorited images
    app.get("/:username/favorited", function (req, res) {
      console.log("Server Post");
      db.User.findOne({
        // using association of two tables to grab all images where userId = user_id, includes all images in the likes association table
        where: {
          userName: req.params.username,
        }
      })
        .then(function (data) {
          db.User.findAll({
            include: [{
              model: db.Image
            }],
            where: {
              user_id: data.id
            }
          })
            // data below will be filtered join table between Likes and Image by user_id
            .then(function (data) {
              var hbsObject = {
                images: data,
                loggedIn: req.params.login,
              };
              // since feed is true page renders feed.
              res.render("index", hbsObject);
            });
        });
      });

      // search & display by tag/username
      app.get("/search/:term", function (req, res) {
        db.Image.findAll({
          include: [{
            model: db.User
          }],
          where: {
            $or: [{
              tag: req.params.term
            }, {
              username: req.params.term
            }]
          }
        }).then(function (result) {
          // render page with only posts with specifed tags or by specified user
          var hbsObject = {
            images: result,
            loggedIn: true
          };
          res.render("index", hbsObject);
        });
      });



      app.get("/api/users", function (req, res) {
        db.User.findaAll().then(function (result) {
          res.json(result);
        });
      });
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
}