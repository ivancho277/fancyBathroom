let location_name;
let seattle = {lat: 47.608013, lng: -122.335167};
let lat;
let lng;

//  const User = require("./user_class");
//  const Image = require("./image_class");
class Image {
    constructor(id_cloudinary, url, userId, tag, locationName, description, isPublic ){
        this.id_cloudinary = id_cloudinary;
        this.url= url;
        this.user_id = userId;
        this.tag = tag;
        this.location_name = locationName;
        this.description = description;
        this.public = isPublic;
    }
}
class User {
    constructor(userid, userName) {
        this.userid = userid;
        this.userName = userName;
    }
}

let user1 = new User("qq01pp", "sailorMoon")
let user2 = new User("ww02oo", "sailorMercury")
let user3 = new User("ee03ii", "sailorVenus")
let user4 = new User("rr04uu", "sailorMars")
let user5 = new User("tt05yy", "sailorJupiter")

let image1 = new Image("could-tst","www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
let image2 = new Image("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
let image3 = new Image("luxury", "the mall", "a cool mall bathroom", true)
let image4 = new Image("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
let image5 = new Image("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)


$("#fun").on("click", function() {
    console.log("button pressed");
    console.log(user1);
    $.post("/api/users", user1, function(err, result) {
        console.log("in ajax post call", result);      
    });
    $.post("/api/images", image2, function(err, result){
        console.log("image ajax post", result);
    })

});

// Connects to google maps API
// Search location field - autocomplete
function initMap() {
    var input = document.getElementById("userInput");
    var autocomplete = new google.maps.places.Autocomplete(input);
    console.log("autocomplete: ", autocomplete);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ["address_components", "geometry", "icon","name"]);  


// Event listener - grabs name of location and address from user input
$("#submit").click(function () {
    location_name = $("#userInput").val().trim(),
    console.log("location name: ", location_name);
});

// Event listener - on click of location button, sends user to google map w/ icon
$(".location").click(function () {
    console.log("hello!")
    map = new google.maps.Map(document.getElementById("map"), {
        center: seattle,
        zoom: 15
      });

   
});

$(".location").click(function () {
    console.log("hello!")
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: seattle,
        zoom: 15
    })

    function queryPlace() {
        let request = {
            location: seattle,
            radius: 5000,
            keyword: location_name,
            fields: ["name", "geometry"]
        };
        console.log("request ", request);

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                lat = results[0].geometry.location.lat(); //assign these to a global var
                lng = results[0].geometry.location.lng();
                console.log("results ", results);
                console.log("lat ", lat);
                console.log("lng ", lng);

                addPin(results[0]);
            }
                //     //use this lat and lng to create a marker and then drop it

        })
    } 
    queryPlace();  
})

// Add and drop marker
function addPin(place) {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsLS0xJx8fLT0tOkA3PTo6LTc/RD9ETy41PUMBCgoKDg0OGxAQGzMlHSUrNTUuLy0wKy8tLS0tLS0tNi0tLS0vLS0tLS0tKy83Ly0tNy0tLS0tLS4tLS0tLSstLf/AABEIADIAMgMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAHAAYDBQgCBAH/xAA4EAABAgUBBQQHBwUAAAAAAAABAgMABAUGEQcSITFBcRMUIlEXMkKRlNHhFSMkY3OhwQgzU2Fi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAMEAgEF/8QAJBEAAgEDBAMBAQEBAAAAAAAAAAECAxExBBITQSEyURSBsSL/2gAMAwEAAhEDEQA/AGKt1eTolPXOz6yllJA8IyVE8ABGoxcnZGZzUFdlSXqvb6M7TM/u/JHzhv55iVqqf0w+l+2/8NR+H+sZ4ZG+aH0/DrDbY4s1H4f6wcMw5ofSDWK2Tn7qofD/AFjvBIOeH0sFp3rR7rW+3TFPJdYAUtt5vYODzEYlBxybjNSwWOMGihazFItZrbUtI70jegHPA+UP0/sI1HoD9EXTWqzKmel3piXU8AttRUnaB3cYqk7RdskcVeSvaw0StkWzUAVChhhCTg9oFBRPQxFyz+l6pQXRkd0+tllSSKOy6knHiUQUmOck/p3jh8Ce9ZGSkblnJWmSBZZaIR2aXSU7WBkx6OnvsuzytUlyNR8WN/ooCm5p0FsJPdd/P2hzhWr9UP0WX5GqID0Sg60KaRarRfWEo70jeRnkYdQdpCa6vEFBMJbUDKuISM5CksbW/rFlyLau/wDToy1a3K1emS0y26Cp9tKilRwoKAAUCPPIjz5RcXY9GMk1dGwqc5LSzKjMPNtpSNtwqUBspG/MZyaOYrhq1UqFYnZ1poJbefW4kLGSATu544Yj0IqokkjzpSpOTbyXHQR6Yduuod4cUr8HwKcD1h5RPW3dlNFRykPMTlAda5viWs9lwjOJxHsg8j5wylLbK4upHcrAP9oPTW12cy+z0Tu/aKdzlgncFDKuLNuSM4xYtOXbySp2YK1TzrX95xQUQN534H+ofovzqq/0fy+BWr53TXB/bZPtZkqlMUOqouFpSpNEotxrvXrpdA8Kknj1huvlpE4/n9r9YsK0UdS1JV/W3eQffcqJcADrSd24BO6J3uvkYtiVmhG0LUs3JOhxxpSu6exux4hCdQ3tVx+nSUnZDjEhWHOuykos5pS8Y72jiM8jDKT/AOhdVXiAH2h2avutkH9L5xRvJ1TFXQuszsxPT1L2G3JBLXbrDg9VzIAx1GfdCatn57HUk146N9rlUZiRtNlplKWpScf7KYS1grUMFQGfLw74xC1/Jud7eDn1SpTO4O9FEw+8BVqgqf09BsXRP9mhSfwfM/8AQhdRK3g3Tb7OgISNKtqPazl3W2unMTCWH0uJdbWoZTkcj746nY41cI/QlcpACp2QIHX5QzkfZjjXR7b0XudrJaqEo2Tx2HFpz7oHUTyg2NdnpzRu63EbDlTllp44cdWoZ6GDkSwjrhfLMPoTuflUJEdMj+I5ys5xxL5pVp3PWjOzk/VJxt955sNIQ3nCRnJJJjMpuWTSilgSoyaJABIAJABIAJABIAJAB//Z',
        draggable: false,
        animation: google.maps.Animation.DROP,
    });

    return marker;
}
}