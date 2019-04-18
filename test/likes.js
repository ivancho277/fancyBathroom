// module.exports = function (sequelize, DataTypes) {
//     var Like = sequelize.define("Like", {
//       // The email cannot be null, and must be a proper email before creation
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       image_id: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     });

//   Like.associate = function(models) {
//     Like.belongsToMany(models.User);
//     Like.belongsToMany(models.Image)
//   };
//   return Like;
// };