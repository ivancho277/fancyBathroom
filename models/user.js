//TESTING OBJECTS
// const User = require("../test/user_class");
// const Image = require("../test/image_class");

// let user1 = new User("qq01pp", sailorMoon)
// let user2 = new User("ww02oo", sailorMercury)
// let user3 = new User("ee03ii", sailorVenus)
// let user4 = new User("rr04uu", sailorMars)
// let user5 = new User("tt05yy", sailorJupiter)



// let image1 = new Image("Cloud-123-id", "www.funPIC.super", "qq01pp", "luxury", "the mall", "a cool mall bathroom", true)
// let image2 = new Image("Cloud-444-id", "www.funPIC.duper", "ww02oo", "luxury", "the mall", "a cool mall bathroom", true)
// let image3 = new Image("Cloud-555-id", "www.funPIC.fun", "ee03ii", "luxury", "the mall", "a cool mall bathroom", true)
// let image4 = new Image("Cloud-143-id", "www.funPIC.heynow", "rr04uu", "luxury", "the mall", "a cool mall bathroom", true)
// let image5 = new Image("Cloud-555-id", "www.funPIC.yolo", "tt05yy", "luxury", "the mall", "a cool mall bathroom", true)



// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      timestamps: false
  });

  User.associate = function(models) {
    User.belongsToMany(models.Image, {as:'likedImages', through: "Likes",foreignKey: "user_id"});
    User.hasMany(models.Image)
  };


  return User;

};