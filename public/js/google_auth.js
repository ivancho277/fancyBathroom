class User {
    constructor(userName) {
        this.userName = userName;
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var username = parseEmail(profile.getEmail());

    // Changing href for My Posts page and My Favorites page
    // $("#my-favs").attr("href", "/" + username + "/favorited/true");
    // $("#my-posts").attr("href", "/" + username + "/posts/true");
    // $("#home").attr("href", "/true");
    // $("#brand").attr("href", "/true");
    // Changing text in account dropdown for posts and favorites
    $("#account").attr("data-name", username);
    $("#account").text(username);
    //Hiding the sign in button and showing the submit form
    $(".g-signin2").hide();
    $("#upload-form").show();
    $(".dropdown-toggle").show();

    var userObj = new User(username);
    addUser();

    // Create new row for new users when they sign in
    // userObj is the User class Object constructed when logged in via Google
    // ajax call to store user info.
    function addUser() {
        $.post("/api/users", userObj, (err, result) => {
            console.log(result);
        }); 
    }
    $("#my-posts").attr("href", "/signed/" + username + "/posts");
    $("#my-favs").attr("href", "/signed/" + username + "/favorited");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.')
        //show the sign in button again and hiding the submit form
        $(".g-signin2").show();
        $("#upload-form").hide();
        $(".dropdown-toggle").hide();
    });
}


// parse email function to grab the unique bit before @ to use as username
function parseEmail(email) {
    var endOfString = email.indexOf('@');
    return email.substring(0, endOfString);
}

