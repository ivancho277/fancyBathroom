

// Create all our routes and set up logic within those routes where required.

// This will run on page load to generate the feed
router.get("/", function(req, res) {
    images.selectAll(function(data) {
      var hbsObject = {
        devour: data
      };
      res.render("index", hbsObject);
    });
  });