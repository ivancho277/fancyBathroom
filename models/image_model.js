module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    id_cloudinary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 140]
      }
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Image.associate = function (models) {
    Image.belongsToMany(models.User, { as: 'likedUsers', through: "Likes", foreignKey: "image_id" });
    Image.belongsTo(models.User)
    // Image.hasMany(models.User);
  };
  return Image;
};