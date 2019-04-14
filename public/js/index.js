// Connects to google maps API
// Search location field - autocomplete
function initMap() {
    var input = document.getElementById("userInput");

    var autocomplete = new google.maps.places.Autocomplete(input);
    console.log("autocomplete: ", autocomplete);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ["address_components", "geometry", "icon","name"]);  
}

// Event listener - grabs name of location and address from user input
$("#submit").click(function () {
    var location_name = {
       name: $("input").val().trim(),
    }
    console.log("location name: ", location_name);
});