//TESTING OBJECTS
const User = require("../test/user_class");
const Image = require("../test/image_class");

let user1 = new User("qq01pp", "sailorMoon")
let user2 = new User("ww02oo", "sailorMercury")
let user3 = new User("ee03ii", "sailorVenus")
let user4 = new User("rr04uu", "sailorMars")
let user5 = new User("tt05yy", "sailorJupiter")

let image1 = new Image("www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
let image2 = new Image("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
let image3 = new Image("luxury", "the mall", "a cool mall bathroom", true)
let image4 = new Image("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
let image5 = new Image("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)

// CRUD Operations
// Find One Sequelize Method

// Display images
// ==============
// display all images in feed default order by most recent

// display all images in feed ordered by most favorited

// display all favorited images by logged-in user

// display all user's posted images

// display images by certain tags (specified in search)

// display images by certain users (specified in search)

// Insert Values to DB
// ===================
// Create new row for new users when they sign in

// Creating new posts for logged in users (cloudinary API update)
$.post("/api/images", function (err, result) {

});



// Update values
// ====================
// Make changes to description and tags

// Delete values
// ====================
// Delete uploaded image



// viewing all users
$.get("/api/users", function (err, result) {
    console.log(result);
});

// adding new user
$.post("/api/users", { userid: "hhww", userName: "sailormoon" }, function (err, result) {
    console.log("in ajax post call", result);
});

// getting all images from Images table
$.get("/api/images", function (err, result) {
    console.log(result);
});

// 

$.post("/api/images", function (err, result) {
    console.log(result);
});




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