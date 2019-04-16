// Page Interactions

class Picture {
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

let picture1 = new Picture("could-tst", "www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
let picture2 = new Picture("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
let picture3 = new Picture("luxury", "the mall", "a cool mall bathroom", true)
let picture4 = new Picture("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
let picture5 = new Picture("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)
// New post submit form

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

            // Change text of button from Upload Image to Change Image
            $("#upload_widget").text("Change Image");

            // append thumbnail to $("#thumbnail")
        }
    });

document.getElementById("upload_widget").addEventListener("click", function () {
    widget.open();
}, false);