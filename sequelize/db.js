const {Sequelize} = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,  process.env.DB_PASSWORD, {
    host: 'containers-us-west-14.railway.app',
    dialect: 'postgres',
    port: "7344",
    define: {
        charset: 'utf-8',
        collate: 'utf8_general_ci'
    }
})

module.exports = sequelize

