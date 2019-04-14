module.exports = function(sequelize, DataTypes) {
    var Images = sequelize.define("images", {
      id: DataTypes.INT,
      cloudinary_id: DataTypes.STRING,

    });
    return Images;
  };
  