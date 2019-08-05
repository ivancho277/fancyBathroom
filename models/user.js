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

  User.associate = function (models) {
    User.belongsToMany(models.Image, { as: 'likedImages', through: "Likes", foreignKey: "user_id" });
    User.hasMany(models.Image);
  };


  return User;

};