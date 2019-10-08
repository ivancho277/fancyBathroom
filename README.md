# Instapotty

Are you someone who enjoys answering nature's call in a novel setting? Do you have several pictures of bar bathrooms on your phone you don't know what to do with because they don't go with your Instagram vibe? If so, Instapotty is for you! Instapotty is a place to share fun and interesting washrooms so other loo connoisseur's can visit your unique find. 

Anyone can view Instapotty's collection of potties, but you'll need to create an account to post some of your own.

This project is a continuation of the original [Instapotty project](https://github.com/ivancho277/fancyBathroom), and is currently **in development**.

## Roadmap
* Search Bar - enable sesarch by tags
* Sort By Favorites Button:
    * If signed in: only show images you've personally favorited
    * If not signed in: show all favorited images sorted by number of likes
* Sign in:
    * Be able to favorite when logged in
    * View your posts
    * When searching from "MyPosts" only show the user's posts in the search
* Edit and Delete functionality
* Google Maps:
    * Get map to open up in new tab
    * Shorten how address is displayed

**Longterm Goals**
Convert to a progressive web app

## Getting Started

To run Instapotty on your local machine, you'll need to clone the repository... 

```
git clone https://github.com/cplank/instaPotty.git 
```
...and install the following dependencies: 

* Express
* Express-Handlebars
* MySQL
* Sequelize

This project also uses Animate.css for some subtle animations.

```
cd [Repository-Directory]
npm install
```

This project relies on the [Google Maps](https://developers.google.com/maps/documentation) and [Google Auth](https://developers.google.com/identity/protocols/OAuth2) API's, so you'll need to get an API key from Google. **Pro Tip:** Use the same account and API key for both Google Maps and Google Auth. In order for the [Cloudinary widget](https://cloudinary.com/documentation/embed_widgets_players) to work, you'll need to create a Cloudinary account and get your pre-set code for either signed or unsigned uploads. 

## Built With

* [Handlebars](http://www.dropwizard.io/1.0.2/docs/)
* [Node Package Manager](https://maven.apache.org/)
* [Express](https://rometools.github.io/rome/)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Bootstrap](https://getbootstrap.com/)
* [Animate.css](https://daneden.github.io/animate.css/)

## API's Used

* [Google Maps API](https://developers.google.com/maps/documentation)
* [Cloudinary Widget](https://cloudinary.com/documentation/embed_widgets_players)
* [Google Auth API](https://developers.google.com/identity/protocols/OAuth2)

## Authors
*Initial Work* - [Instapotty V1](https://github.com/ivancho277/fancyBathroom)

* **[Carrie Plank](https://github.com/cplank)** 
* **[Katie Haster](https://github.com/katiehaster)**
* **[Bill Lee](https://github.com/mjblee20)**
* **[Ivan Rouskov](https://github.com/ivancho277)**

*Current Version* - [Instapotty V2](https://insta-potty.herokuapp.com/)
* **[Carrie Plank](https://github.com/cplank)**
* **[Aprille Perez](https://github.com/aprilleperez)**

## Lessons Learned

It was a great exercise to migrate Instapotty V2 over from Instapotty V1. This involved deploying to a new server and intializing a new database set up. It's also been challenging adding new features to source code you weren't necessarily the lead author on. Definitely a new found appreciation for comments! 

