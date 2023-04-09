module.exports = (sequelize, DataTypes) => {
  const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/
  const User = sequelize.define(
    "user",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: function (v) {
            return phoneValidationRegex.test(v);
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileimage: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
  return User;
};
