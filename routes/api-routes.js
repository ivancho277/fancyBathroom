var db = require("../models");

// Routes
//============
module.exports = function (app) {
  // Create all our routes and set up logic within those routes where required.

  // CREATE/INSERT DATA TO DATABASE
  // ==============================
  // POST route for logging a new user into Users table
  // server side check
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
  app.post("/api/images", function (req, res) {
    console.log(req.body);
    db.Image.create(req.body).then(function (err, result) {
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
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table

        // var hbsObject = {
        //   images: data,
        // };

        var hbsObject = {
          images: [{
            id: "12345",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561387/pusheen.png"
          },
          {
            id: "54667",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561328/21577fac71c1839.jpg"
          },
          {
            id: "99816",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561318/SardonyxWrong_PNG.png"
          },
          {
            id: "441",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555556515/gcrbt9dptcj5ezydhnvi.png"
          },
          {
            id: "998",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561387/pusheen.png"
          },
          {
            id: "234",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561328/21577fac71c1839.jpg"
          },
          {
            id: "42",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555561318/SardonyxWrong_PNG.png"
          },
          {
            id: "11113",
            url: "https://res.cloudinary.com/instapotty/image/upload/v1555556515/gcrbt9dptcj5ezydhnvi.png"
          }],
          post: false,
          favorites: false
        };
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // when logged in make the add new post form available for user
  app.get("/:login", function (req, res) {
    db.Image.findAll()
      .then(function (data) {
        // 
        // data is the entire images table
        var hbsObject = {
          images: data,
          login: req.params.login
        };
        $("#favBtn").show();
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // grab data from image data ordered by most favorited
  app.get("/feed/orderbymostfavorited/", function (req, res) {
    db.Image.findAll({
      include: [User],
      // joins Image and User table
      // SELECT COUNT(Image.id) as Count
      attributes: ['User.*', 'Image.*', [sequelize.fn('COUNT', sequelize.col('Image.id')), 'Count']],
      order: ['Count', 'DESC']
    })
      .then(function (data) {
        // feed, post and favorites will be determined by parameters passed in but now I'll hard code only rendering feed.
        // data is the entire images table
        var hbsObject = {
          images: data,
          loggedIn: true
        };
        $("#favBtn").show();
        // since feed is true page renders feed.
        res.render("index", hbsObject);
      });
  });

  // display all user's posted images
  app.get("/:username/posts/:login", function (req, res) {
    db.User.findOne({
      where: {
        userName: req.params.username
      }
    })
      // userData = {user_id, userName}
      .then(function (userData) {
        console.log(userData);
        db.Image.findAll({
          where: {
            user_id: userData[0].id
          }
        }).then(function (imgData) {
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
  app.get("/:username/favorited/:login", function (req, res) {
    db.User.findOne({
      // using association of two tables to grab all images where userId = user_id, includes all images in the likes association table
      where: {
        userName: req.params.username,
      }
    })
      .then(function (data) {
        console.log(data);
        db.Likes.findAll({
          include: [Image],
          where: {
            user_id: data[0].id
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

  // NEED HELP
  // search & display by tag/username
  app.get("/search/:term", function (req, res) {
    db.Image.findAll({
      include: [User],
      where: {
        $or: [{
          tag: req.params.term
        }, {
          username: req.params.term
        }]
      }
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