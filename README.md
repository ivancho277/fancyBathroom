# instaPotty

https://instapotty.herokuapp.com/  

## Description

Do have a bunch of pictures of intersting, funny, super classy, trashy, or iconic bathrooms? Are you hestitant to upload them to Instagram because you're worried people will judge you for your appreciation of fine loos? Instapotty is for you! 

Instapotty is a place to share pictures of bathrooms made you chuckle, gave you pause, or were so dang classy you want to remember them forever. Anyone can visit Instapotty to see the most up-to-date pictures, but in order to share your own finds you'll need to log in using your Google account. Logged in users can upload photos and add others' finds to their favorites for future purusing.

## Built With

* Node
* Express
* MySQL
* Sequelize ORM
* Handlebars
* Javascript
* jQuery
* Bootstrap
* Animate.css

## Technologies Used

* Google Maps API
* Cloudinary Widget
* Goole Auth API 

## Authors

<b>Forked from Instapotty created by:</b>
Katie Haster 
Ivan Rouskov 
Bill Lee
Carrie Plank

<b>Instapotty V2 modified by:</b>
Carrie Plank
Aprille Perez  

## Sitemap

- Landing section: new visitors to Instapotty are greeted with the feed of bathroom pictures with the description, location, and tags. The toilet paper icon on the left of the page sorts the feed by the pictures with the most likes. 

- Log in: when a user logs in, the feed changes to add a "like" icon so users can like their favorite bathrooms. 

- My posts: displays all of the user's bathroom posts.

- My favs: displays all of the user's favorite posts.

- Sign out: logs the user out of the site. 

## Design

We wanted this app to be clean but quirky, and follow the given convention for uploading images and displaying a feed (a la Instagram). We wanted to have clear differences between when a user is logged in or not logged in. 

## Google Maps API

### Getting Set Up: ###

The process of getting an API key: from the Google Developer Console, set up a project to get the key itself. Then select one of several API options. We chose the Google Maps Javascript API.

### Integration: ###

The Google Maps Javascript API was used for two components:

1. The autocomplete search. We required this as an integral piece for both user experience and the ability to ensure that accurate data gets captured and re-incorporated.

2. The map itself, complete with a customizable drop pin and an info window. 
Take a user who is interested in checking out one of the crazy cool bathrooms they see on the app. 
This user can click on the location of the image and a map will populate, with a customized little toilet drop-pin that shows them exactly where the crazy cool bathroom is. An info window will also populate
above the pin, and the user can click on this info window to be taken directly to
the google site for the location.

## Cloudinary Widget

### Getting Set Up: ###

Cloudinary offers several options for uploading media, both server side and browser side. We decided to go with the Cloudinary widget as our one-stop-shop because it looks the nicest and handles the upload. The widget requires a Cloudniary account and a pre-set code for either signed or unsigned uploads. 

### Integration: ###

The Cloudniary widget handles all of the restrictions on image uploads (max file size, max/min image size, allowable formats) as well as handling the generation of the thumbnail image. The widget can be used for multiple image uploads, but we decided to only allow one image at a time. 

## Google Auth API

### Getting Set Up: ###

Similar to getting set up with the Google Maps API. In fact, the process was so similar we ran into issues where we had multiple Google code calling the same functions and breaking. *Key Takeaway* Use the same account for all Google APIs.

### Integration: ###

* Used googles configuration for website and server authentication throuah a google account.
* Google+'s API for authentication had been depreciated and their own library is the only way
implement authentication with Google on a 3rd party app.
* Through using google implmented library we are able to pull very basic profile information
like name and email, which is all we needed.
* If more profile info. was need google provides authentication tokenId's that should be used to 
retrieve and store sensitive information on our own database.
* Main problem that arrose was finding the ability to test authentication on a localhost, which
we have not solved yet.

## Future Development 

* Add update and delete options for users to edit or delete their posts.
* Transition from Sequelize to MongoDB
* Add more functionality to the search bar 
* Implement use of server side Authentication for added security
* Implement our own authentication and sign-up with passport.js to give user's more options for creating an account
* Ensure the site is truly mobile responsive.

