function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var username = parseEmail(profile.getEmail());
    
    // Changing href for My Posts page and My Favorites page
    $("#my-favs").attr("href", "/" + username + "/favorited/true");
    $("#my-posts").attr("href", "/" + username + "/posts/true");
    $("#home").attr("href", "/true");
    // Changing text in account dropdown for posts and favorites
    $("#account").text(username);

    var userObj = new User(username);
    // Create new row for new users when they sign in
    // userObj is the User class Object constructed when logged in via Google
    $.get("/true", function(err, result) {
        console.log(result);
    });

    // ajax call to store user info.
    $.post("/api/users", userObj, (err, result) => {
        console.log(result);
    }); 

    // display all favorited images by logged-in user
    $.get("/" + username + "/favorited/true", function (err, result) {
        console.log("favorited images", result);
    });

    // display all user's posted images
    $.get("/" + username + "/posts/true", function (err, result) {
        console.log("user posts", result);
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $("#my-favs").attr("href", "/" + username + "/favorited/");
    $("#my-posts").attr("href", "/" + username + "/posts/");
    $("#home").attr("href", "/");
}


// parse email function to grab the unique bit before @ to use as username
function parseEmail(email){
    var endOfString = email.indexOf('@');
    return email.substring(0, endOfString);
}