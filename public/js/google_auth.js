function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // //check if in DB already
    // //then 
    // //ajax call to store user info.

    // // server side check
    // app.post("/api/users", function (req, res) {
    //     // check if they're already user (not sure how...)
    //    db.User.findOrCreate({
    //      where: 
    //        { userName: req.body.userName },
    //    }).then(function (err, result) {
    //      console.log("create row", result);
    //      res.json(result);
    //    });
    //  });
    $.post("/api/users", new User(parseEmail(profile.getEmail()), (err, result) => {
        if(err) throw err
        console.log(result);
    })) 
  }

 // <a href="#" onclick="signOut();">Sign out</a>

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


  //parse email function
  function parseEmail(email){
      var endOfString = email.indexOf('@');
      return email.substring(0, endOfString);
  }