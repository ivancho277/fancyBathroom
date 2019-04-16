// Page Interactions

class Image {
    constructor(id_cloudinary, url, userId, tag, locationName, description, isPublic) {
        this.id_cloudinary = id_cloudinary;
        this.url = url;
        this.user_id = userId;
        this.tag = tag;
        this.location_name = locationName;
        this.description = description;
        this.public = isPublic;
    }
}

// New post submit form

//Onclick for cloudinary upload
let submitAllow = false;
let imageInfo = {};
let imageObject = {};
// var widget = cloudinary.createUploadWidget({
//     cloudName: "instapotty", uploadPreset: "wveqgdsr"
// },
//     function (error, result) {
//         //Get image info
//         // console.log(result);
//         // if (result.event === "success") {
//         //     let imageInfo = result.event.info;
//         //     let publicId = imageInfo.public_id;
//         //     let thumbnailUrl = imageInfo.thumbnail_url;
//         //     let url = imageInfo.url;

//         //     //send image info to our database
//         // }
//         if (!error && result && result.event === "success") { 
//             console.log('Done! Here is the image info: ', result.info); 
//           }


//     });

// document.getElementById("upload_widget").addEventListener("click", function () {
//     widget.open();
// }, false);

$("#uploadSubmit").on("click", function () {
    console.log("in upload submit");
    if (submitAllow) {
        var public;
        // cloud-id, url, user-id, tag, location-name, description, public

        // not sure if will work
        if ($("input[name='public']:checked")) {
            public = true;
        } else {
            public = false;
        }
        var imageObj = new Image(imageInfo.cloudinary, imageInfo.url, "user-id", $("#category").val(), $("#location").val().trim(), $("#description").val().trim(), public);
        console.log("obj added to database", imageObj);
    }
    submitAllow = false;
});


// Connects to google maps API
// Search location field - autocomplete
// function initMap() {
//     var input = document.getElementById("userInput");

//     var autocomplete = new google.maps.places.Autocomplete(input);
//     // console.log("autocomplete: ", autocomplete);

//     // Set the data fields to return when the user selects a place.
//     autocomplete.setFields(
//         ["address_components", "geometry", "icon", "name"]);
// }

// // Event listener - grabs name of location and address from user input
// $("#submit").click(function () {
//     var location_name = {
//         name: $("input").val().trim(),
//     }
//     // console.log("location name: ", location_name);
// });