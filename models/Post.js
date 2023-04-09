module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "post",
      {
        about: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        postimage: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }
    );
    return Post;
  };