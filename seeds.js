var db = require("./models");

var userSeeds = [
    {
    id: 1,
    id_cloudinary: 'Cloud-123-id',
    url: 'https://res.cloudinary.com/instapotty/image/upload/v1555714153/sgrvbbvg6npzuh6ayavx.jpg',
    tag: 'luxury',
    location_name: 'the mall',
    description: 'a cool mall bathroom',
    public: true
},
{
    id: 2,
    id_cloudinary: 'Cloud-456-id',
    url: 'https://res.cloudinary.com/instapotty/image/upload/v1563304749/gzecpwhqd87wpvstmqeg.jpg',
    tag: 'cute',
    location_name: 'SLU',
    description: 'bananas everywhere',
    public: true
}
];


//this code checks the DB to see if there is already content (seeds)
//if no content, add seeds. 
//if there is content, do not add seeds.
function seed() {
    db.Users.count().then(c => {
        if (c == 0) {
            userSeeds.forEach(function (user) {
                db.Users.create(user);
            })
        }
    });
};

module.exports = seed;