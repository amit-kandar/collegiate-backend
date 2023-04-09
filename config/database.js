const { Sequelize, DataTypes } = require('sequelize')

const info = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: 'mysql'
}

const sequelize = new Sequelize(
    info.DB,
    info.USER,
    info.PASSWORD, {
        host: info.HOST,
        dialect: info.dialect,
        operatorAliases: false
    }
)

sequelize.authenticate()
    .then(()=>{
        console.log("Connected!");
    })
    .catch(err=>{
        console.log('Error: '+err);
    })

const db = {}



db.Sequelize = Sequelize
db.sequelize = sequelize

db.admin = require('../models/Admin')(sequelize, DataTypes)
db.user = require('../models/User')(sequelize, DataTypes)
db.post = require('../models/Post')(sequelize, DataTypes)
db.feedback = require('../models/Feedback')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(()=>{
        console.log("re-sync Done!");
    })
    .catch(err=>{
        console.log(err);
    })

db.user.hasMany(db.post, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'cascade'
})
db.post.belongsTo(db.user, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = db