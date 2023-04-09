module.exports = (sequelize, DataTypes) => {
    const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/
    const Feedback = sequelize.define(
      "feedback",
      {
        name: {
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
        message: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
      }
    );
    return Feedback;
  };
  