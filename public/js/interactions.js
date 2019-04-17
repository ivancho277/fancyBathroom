// // Page Interactions

// class Picture {
//     constructor(id_cloudinary, url, userId, tag, locationName, description, isPublic) {
//         this.id_cloudinary = id_cloudinary;
//         this.url = url;
//         this.user_id = userId;
//         this.tag = tag;
//         this.location_name = locationName;
//         this.description = description;
//         this.public = isPublic;
//     }
// }
// class User {
//     constructor(userName) {
//         this.userName = userName;
//     }
// }

// let user1 = new User("sailorMoon")
// let user2 = new User("sailorMercury")
// let user3 = new User("sailorVenus")
// let user4 = new User("sailorMars")
// let user5 = new User("sailorJupiter")

// let picture1 = new Picture("could-tst", "www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
// let picture2 = new Picture("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
// let picture3 = new Picture("luxury", "the mall", "a cool mall bathroom", true)
// let picture4 = new Picture("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
// let picture5 = new Picture("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)
// // New post submit form

// //Onclick for cloudinary upload
// let submitAllow = false;
// let imageInfo = {};
// let imageObj = {};

// var widget = cloudinary.createUploadWidget({
//     cloudName: "instapotty", uploadPreset: "wveqgdsr",
//     thumbnailTransformation: { width: 200, height: 200, crop: 'fit' },
//     styles: {
//         palette: {
//             window: "#17A7AD",
//             windowBorder: "#E9B000",
//             tabIcon: "#AB3A4B",
//             menuIcons: "#6195D8",
//             textDark: "#2F0342",
//             textLight: "#FFFFFF",
//             link: "#0C6D71",
//             action: "#FF620C",
//             inactiveTabIcon: "#0E2F5A",
//             error: "#E24E42",
//             inProgress: "#EB6E80",
//             complete: "#0993A9",
//             sourceBg: "#E4EBF1"
//         },
//         fonts: {
//             default: null,
//             "'Yanone Kaffeesatz', sans-serif": {
//                 url: "https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz",
//                 active: true
//             }
//         }
//     }
// },
//     function (error, result) {
//         //Get image info
//         console.log(result);
//         if (result.event === "success") {
//             submitAllow = true;
//             console.log("allow", submitAllow);

//             // save imageInfo into object
//             imageInfo.cloudinary = result.info.public_id;
//             imageInfo.thumbnailUrl = result.info.thumbnail_url;
//             imageInfo.url = result.info.url;

//             // Change text of button from Upload Image to Change Image
//             $("#upload_widget").text("Change Image");

//             // append thumbnail to $("#thumbnail")
//             $("#thumbnail").append(`<img  id="thumbnail-image" src="${imageInfo.thumbnailUrl}"/>`)
//             $("#thumbnail").show();
//         }
//     });

// document.getElementById("upload_widget").addEventListener("click", function () {
//     widget.open();
// }, false);



