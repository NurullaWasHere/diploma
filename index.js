const express = require('express')
const sequelize = require('./sequelize/db')
const cors = require('cors')
const apiRouter = require('./routes/apiRouter')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', apiRouter)



app.listen(process.env.PORT,async  () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
    } catch (error) {
        console.log(error)
    }
    console.log(`App started on port ${process.env.PORT}`)
})