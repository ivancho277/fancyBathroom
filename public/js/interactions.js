// Page Interactions

// New post submit form

//Onclick for cloudinary upload
let submitAllow = false;
let imageInfo = {};
let imageObject = {};
var widget = cloudinary.createUploadWidget({
    cloudName: "instapotty", uploadPreset: "wveqgdsr"
},
    function (error, result) {
        //Get image info
        console.log(result);
        if (result.event === "success") {
            submitAllow = true;
            console.log("allow", submitAllow);
            let data = result.event.info;

            // save imageInfo into object
            imageInfo.cloudinary = data.public_id;
            imageInfo.thumbnailUrl = data.thumbnail_url;
            imageInfo.url = data.url;

            // Change text of button from Upload Image to Change Image
            $("#upload_widget").text("Change Image");

            // append thumbnail to $("#thumbnail")
        }
    });

document.getElementById("upload_widget").addEventListener("click", function () {
    widget.open();
}, false);

$("#submit").on("click", function () {
    if (submitAllow) {
        imageObject.cloudinary_id = imageInfo.cloudinary;
        imageObject.url = imageInfo.url;
        imageObject.location = $("#")
    }
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