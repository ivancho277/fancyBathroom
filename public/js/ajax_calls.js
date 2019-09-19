////////////////////////////////////////////
//                                      ////
//      PICTURE CLASS CONSTRUCTOR       ////
////////////////////////////////////////////
class Picture {
    constructor(id_cloudinary, url, tag, locationName, description, isPublic, username) {
        this.id_cloudinary = id_cloudinary;
        this.url = url;
        this.tag = tag;
        this.location_name = locationName;
        this.description = description;
        this.public = isPublic;
        this.username = username;
    }
}

//////////////////////////////////////////
//                                      //
//              TEST DATA               //
//                                      //
//////////////////////////////////////////

let picture1 = new Picture("could-tst", "www.funPIC.super", "luxury", "the mall", "a cool mall bathroom", true)
let picture2 = new Picture("Cloud-444-id", "www.funPIC.duper", "luxury", "the mall", "a cool mall bathroom", true)
let picture3 = new Picture("Cloud-143-id", "www.funPIC.heynow", "luxury", "the mall", "a cool mall bathroom", true)
let picture4 = new Picture("Cloud-143-id", "www.funPIC.heynow", "luxury", "the mall", "a cool mall bathroom", true)
let picture5 = new Picture("Cloud-555-id", "www.funPIC.yolo", "luxury", "the mall", "a cool mall bathroom", true)
// New post submit form

// /////////////////////////////////////
//          CLOUDINARY               ///
// ================================= ///

let submitAllow = true;
let imageInfo = {};
let imageObj = {};

var widget = cloudinary.createUploadWidget({
    cloudName: "instapotty", uploadPreset: "wveqgdsr",
    thumbnailTransformation: { width: 200, height: 200, crop: 'fit' },
    multiple: false,
    clientAllowedFormats: ["png", "gif", "jpeg"],
    maxFileSize: 1500000,
    maxImageWidth: 5000,
    maxImageHeight: 5000,
    minImageWidth: 400,
    minImageHeight: 400,
    styles: {
        palette: {
            window: "#17A7AD",
            windowBorder: "#E9B000",
            tabIcon: "#AB3A4B",
            menuIcons: "#6195D8",
            textDark: "#2F0342",
            textLight: "#FFFFFF",
            link: "#0C6D71",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#E24E42",
            inProgress: "#EB6E80",
            complete: "#0993A9",
            sourceBg: "#E4EBF1"
        },
        fonts: {
            default: null,
            "'Yanone Kaffeesatz', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz",
                active: true
            }
        }
    }
},
    function (error, result) {
        //Get image info
        // console.log(result);
        if (result.event === "success") {
            submitAllow = true;
            console.log("allow", submitAllow);

            // save imageInfo into object
            imageInfo.cloudinary = result.info.public_id;
            imageInfo.thumbnailUrl = result.info.thumbnail_url;
            imageInfo.url = result.info.url;

            // Change text of button from Upload Image to Change Image
            $("#upload_widget").text("Change Image");

            // append thumbnail to $("#thumbnail")
            $("#thumbnail").append(`<img  id="thumbnail-image" src="${imageInfo.thumbnailUrl}"/>`)
            $("#thumbnail").show();
        }
    });

document.getElementById("upload_widget").addEventListener("click", function () {
    widget.open();
}, false);

// ====================================
// Creating new posts for logged in users (cloudinary API update) and adding the posts to database
// postInfo is the Picture class Object contructed from user's input
//$("#upload-form").show();
$("#uploadSubmit").on("click", function (event) {

    // This turns falsy values to Boolean False, and vice versa
    var public = !!$('#public:checked').length;
    let username = $("#account").data()
    username = username.name
    console.log("what is username", username)

    var postInfo = new Picture(
        imageInfo.cloudinary,
        imageInfo.url,
        $("#category").val(),
        $("#userInput").val().trim(),
        $("#description").val().trim(),
        public,
        username
    )

    console.log("From AJAX calls", postInfo);
    $.post("/api/images", postInfo, function (result) {
        console.log("IS this result??", result);
        location.reload();
    });

    // location.reload();
})

let userObject = {};
// getUserId();
// function getUserId() {
//     $.get("/signed/" + $("#account").data("name"), function (result) {
//         userObject.id = result.id;
//         userObject.userName = result.userName;
//     });
// }


//////////////////////////////////////////////////////////////
//                                                         //
// THIS IS A PROBLEM SPOT - TRYING TO FAVORITE A POTTY     //
/////////////////////////////////////////////////////////////


// button on image that allows user to add an image to their favorites collection
$(".add-favs").on("click", function () {
    // construct obj to add to db.Likes
    var likesObj = {
        // grab from ajax call
        user_id: userObject.id,
        image_id: $(this).data("id")
    }
    // adds the user fav img relationship to the likes table
    $.post("/api/likes", likesObj, (result) => {
        console.log(result);
    });
});

// Load Feed Page on start

//////////////////////////////////////////////////////////////
//                                                         //
// THIS IS A PROBLEM SPOT - TRYING TO FAVORITE A POTTY     //
/////////////////////////////////////////////////////////////n


// display all images in feed default order by most recent
$.get("/", function (result) {
    // console.log(result); //this had console logged the whole HTML
});

// display all images in feed ordered by most favorited
$("#sort-by-fav").on("click", function (event) {
    event.preventDefault();
    $.get("/feed/orderbymostfavorited", function (err, result) {
        console.log("hello from ordered by most favorite" + result);
    });
});
//Comment here

// display images with certain tags or by certain users by certain users (specified in search)
$("#searchBtn").on("click", function () { // submit button on survey modal
    // grabs user input, prevents being able to click outside of modal, and hides modal one
    event.preventDefault();

    // grabs user input and converts to corresponding variable
    var bathroomTag = $("#bathroomTag").val();
    alert("this was clicked" + bathroomTag);
    console.log(bathroomTag);

    window.location.href = `/search/${bathroomTag}`;

    // CHANGE TO GET, FIX API ROUTE
    $.get({
        URL: "/search/:term",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
        .then(function (data) {
            console.log("search went thru", data);
            if (data != 200) {
                // log/show error
                console.log("this is the conlog")
            }

            //   window.location.href = "/";
        })

});

// EVERYTHING BELOW THIS is old search, before dropdown
// $("#searchBtn").on("click", function (event) {
//     event.preventDefault();
//     $.get("/search/" + $("#searchTerm").val(), function (err, result) {
//         console.log("clicked Search Button", $("#searchTerm").val())
//     });
// })

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

// Connects to google maps API
// Search location field - autocomplete
// function initMap() {
//     var input = document.getElementById("userInput");

//     var autocomplete = new google.maps.places.Autocomplete(input);
//     console.log("autocomplete: ", autocomplete);

//     // Set the data fields to return when the user selects a place.
//     autocomplete.setFields(
//         ["address_components", "geometry", "icon", "name"]);
// }

// // Event listener - grabs name of location and address from user input
// $("#submit").click(function () {
//     var location_name = {
//         name: $("input").val().trim(),
//     }
//     console.log("location name: ", location_name);
// });

$("#test").on("click", function () {
    $.post("signed/" + userObject.id + "/api/images", function (result) {
        console.log(result);
    });
});

// Progress made 08/22:

// Carrie's workbench still doesn't work :( But we made progress on the search (done!) and order my favorites.)