
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
    constructor(userName) {
        this.userName = userName;
    }
}

let user1 = new User("sailorMoon")
let user2 = new User("sailorMercury")
let user3 = new User("sailorVenus")
let user4 = new User("sailorMars")
let user5 = new User("sailorJupiter")

let image1 = new Image("could-tst", "www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
let image2 = new Image("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
let image3 = new Image("luxury", "the mall", "a cool mall bathroom", true)
let image4 = new Image("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
let image5 = new Image("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)


var hbsObject = {
    images: [{
        id: "12345",
        url: "https://res.cloudinary.com/instapotty/image/upload/v1555094268/samples/sheep.jpg"
    },
    {
        id: "54667",
        url: "https://res.cloudinary.com/instapotty/video/upload/v1555094286/samples/elephants.mp4"
    },
    {
        id: "99816",
        url: "https://res.cloudinary.com/instapotty/video/upload/v1555094283/samples/sea-turtle.mp4"
    },
    {
        id: "441",
        url: "https://res.cloudinary.com/instapotty/image/upload/v1555094277/samples/animals/kitten-playing.gif"
    }],
    feed: true,
    post: false,
    favorites: false,
    loggedIn: true
};
console.log("BOOM!")
res.render("index", hbsObject);

