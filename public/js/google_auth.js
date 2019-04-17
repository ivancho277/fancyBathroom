function onSignIn(googleUser) {
    var username = profile.getName();
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + username);
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


    // Changing href for My Posts page and My Favorites page
    $("#my-favs").attr("href", "/" + username + "/favorited");
    $("#my-posts").attr("href", "/" + username + "/posts");

    //check if in DB already
    //then 
    //ajax call to store user info.
    $.post("/api/users", new User(parseEmail(profile.getEmail()), (err, result) => {
        if(err) throw err;
        console.log(result);
    })) 

    // display all favorited images by logged-in user
    $.get("/" + username + "/favorited", function (err, result) {
        if(err) throw err;
        console.log("favorited images", result);
    });

    // display all user's posted images
    $.get("/" + username + "/posts", function (err, result) {
        if(err) throw err;
        console.log("user posts", result);
    });

  }

  //parse email function
  function parseEmail(email){
      var endOfString = email.indexOf('@');
      return email.substring(0, endOfString);
  }