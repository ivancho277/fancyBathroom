
$("#fun").on("click", function () {
    console.log("button pressed");
    console.log(user1);
    $.post("/api/users", user1, function (err, result) {
        console.log("in ajax post call", result);
    });
    $.post("/api/images", image2, function (err, result) {
        console.log("image ajax post", result);
    })

});
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

let image1 = new Image("could-tst", "www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
let image2 = new Image("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
let image3 = new Image("luxury", "the mall", "a cool mall bathroom", true)
let image4 = new Image("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
let image5 = new Image("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)


var hbsObject = {
    images: [],
    feed: true,
    post: false,
    favorites: false,
    loggedIn: true
};
console.log("BOOM!")
res.render("index", hbsObject);

