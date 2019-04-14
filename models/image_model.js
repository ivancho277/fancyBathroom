module.exports = function (sequelize, DataTypes) {
    var Image = sequelize.define("User", {
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
      url:{
          type:DataTypes.STRING,
          allowNull: false
      },
      user_id: {
          type: DataTypes.STRING,
          allowNull: false
      },
      tag:{
          type: DataTypes.STRING,
          allowNull: false
      },
      location_name:{
          type: DataTypes.STRING,
          allowNull: false
      },
      decription :{
          type: DataTypes.STING,
          validate: {
            len: [0, 140]
          }
      },
      public: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
    });
    return Image;
  };