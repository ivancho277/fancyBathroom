
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true     
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};