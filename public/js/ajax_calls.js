//Onclick for cloudinary upload
let submitAllow = false;
let imageInfo = {};
let imageObj = {};

var widget = cloudinary.createUploadWidget({
        cloudName: "instapotty", uploadPreset: "wveqgdsr"
    },
    function (error, result) {
        //Get image info
        console.log(result);
        if (result.event === "success") {
            submitAllow = true;
            console.log("allow", submitAllow);
            
            // save imageInfo into object
            imageInfo.cloudinary = result.info.public_id;
            imageInfo.thumbnailUrl = result.info.thumbnail_url;
            imageInfo.url = result.info.url;
        }

    });

document.getElementById("upload_widget").addEventListener("click", function () {
    widget.open();
}, false);

// CRUD OPERATIONS
// ===============

// Create/Insert Values to DB
// ==========================
// Create new row for new users when they sign in
// userInfo is the User class Object constructed when logged in via Google
$.post("/api/users", "userInfo", function (err, result) {
    console.log("in ajax post call", result);
});

// Creating new posts for logged in users (cloudinary API update) and adding the posts to database
// postInfo is the Picture class Object contructed from user's input
$("#uploadSubmit").on("click", function(event) {
    var public = !!$('#public:checked').length;

    var postInfo = new Picture(
        imageInfo.cloudinary,
        imageInfo.url,
        "userid",
        $("#category").val(),
        $("#location").val().trim(),
        $("#description").val().trim(),
        public
    )
    console.log(postInfo);
    $.post("/api/images", postInfo, function (err, result) {
        console.log(result);
    });
})  


// Read/Display images
// ===================
// display all images in feed default order by most recent
$.get("/", function(err, result) {
    console.log(result);
});

// display all images in feed ordered by most favorited
$.get("/feed/orderbymostfavorited", function(err, result) {
    console.log(result);
});

// display all favorited images by logged-in user
$.get("/" + "username" + "/favorited", function (err, result) {

});

// display all user's posted images
$.get("/" + "username" + "/posts", function (err, result) {
    
});

// display images with certain tags or by certain users by certain users (specified in search)

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    $.get("/search/" + $("#searchTerm").val(), function (err, result) {
        console.log("clicked Search Button", $("#searchTerm").val())
    });
})


// Insert Values to DB
// ===================
// Create new row for new users when they sign in

// Creating new posts for logged in users (cloudinary API update)

$.post("/api/images", function (err, result) {

});



// Update values
// ====================
// Make changes to description and tags
// $.ajax({
//     url: '/',
//     type: 'PUT',
//     success: function(response) {
//         console.log(response);
//     }
// });

// Delete values
// ====================
// Delete uploaded image
// $.ajax({
//     url: '/',
//     type: 'DELETE',
//     success: function(response) {
//         console.log(response);
//     }
// });


// viewing all users
// $.get("/api/users", function (err, result) {
//     console.log(result);
// });



// getting all images from Images table
// $.get("/api/images", function (err, result) {
//     console.log(result);
// });

// 





// Connects to google maps API
// Search location field - autocomplete
function initMap() {
    var input = document.getElementById("userInput");

    var autocomplete = new google.maps.places.Autocomplete(input);
    console.log("autocomplete: ", autocomplete);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ["address_components", "geometry", "icon", "name"]);
}

// Event listener - grabs name of location and address from user input
$("#submit").click(function () {
    var location_name = {
        name: $("input").val().trim(),
    }
    console.log("location name: ", location_name);
});