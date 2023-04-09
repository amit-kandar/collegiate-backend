module.exports = (sequelize, DataTypes) => {
    const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/
    
    const Admin = sequelize.define("admin", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                validator: function (v) {
                    return phoneValidationRegex.test(v);
                },
            }
        },
        adminid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adminimage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },{
        timestamps: false
    })
    return Admin
}
